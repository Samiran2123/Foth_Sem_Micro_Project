/**
 * Lambda: approveUser
 * 
 * Route:  POST /auth/approve-user
 * Access: Admin only (enforced by API Gateway Cognito Authorizer + role check)
 *
 * Body: { userId: string, role: "Student" | "Teacher" | "Scheduler" }
 *
 * Actions:
 *  1. Adds user to the Cognito group matching the role
 *  2. Updates custom:status → "APPROVED" and custom:role → role
 *  3. Updates the Users DynamoDB table
 *
 * Environment variables required:
 *   USER_POOL_ID      – Cognito User Pool ID
 *   USERS_TABLE_NAME  – DynamoDB table name
 */

import { CognitoIdentityProviderClient, AdminAddUserToGroupCommand, AdminUpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider';
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

const cognito = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });
const dynamo  = new DynamoDBClient({ region: process.env.AWS_REGION });

const ALLOWED_ROLES = ['Student', 'Teacher', 'Scheduler'];

export const handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  };

  try {
    // ── Verify caller is Admin ──────────────────────────────
    const claims = event.requestContext?.authorizer?.claims || {};
    const callerGroups = (claims['cognito:groups'] || '').split(',');
    if (!callerGroups.includes('Admin')) {
      return { statusCode: 403, headers, body: JSON.stringify({ message: 'Forbidden: Admin only' }) };
    }

    // ── Parse body ─────────────────────────────────────────
    const { userId, role } = JSON.parse(event.body || '{}');
    if (!userId || !role) {
      return { statusCode: 400, headers, body: JSON.stringify({ message: 'userId and role are required' }) };
    }
    if (!ALLOWED_ROLES.includes(role)) {
      return { statusCode: 400, headers, body: JSON.stringify({ message: `Invalid role. Allowed: ${ALLOWED_ROLES.join(', ')}` }) };
    }

    const userPoolId = process.env.USER_POOL_ID;

    // ── 1. Add user to Cognito group ───────────────────────
    await cognito.send(new AdminAddUserToGroupCommand({
      UserPoolId: userPoolId,
      Username:   userId,
      GroupName:  role,
    }));

    // ── 2. Update Cognito custom attributes ────────────────
    await cognito.send(new AdminUpdateUserAttributesCommand({
      UserPoolId: userPoolId,
      Username:   userId,
      UserAttributes: [
        { Name: 'custom:status', Value: 'APPROVED' },
        { Name: 'custom:role',   Value: role },
      ],
    }));

    // ── 3. Update DynamoDB ─────────────────────────────────
    await dynamo.send(new UpdateItemCommand({
      TableName: process.env.USERS_TABLE_NAME,
      Key: marshall({ userId }),
      UpdateExpression: 'SET #status = :status, #role = :role, updatedAt = :updatedAt, approvedBy = :approvedBy',
      ExpressionAttributeNames: {
        '#status': 'status',
        '#role':   'role',
      },
      ExpressionAttributeValues: marshall({
        ':status':     'APPROVED',
        ':role':        role,
        ':updatedAt':   new Date().toISOString(),
        ':approvedBy':  claims.sub || 'admin',
      }),
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: `User ${userId} approved as ${role}` }),
    };
  } catch (err) {
    console.error('approveUser error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error', error: err.message }),
    };
  }
};
