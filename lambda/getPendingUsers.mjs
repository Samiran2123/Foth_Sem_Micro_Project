/**
 * Lambda: getPendingUsers
 *
 * Route:  GET /auth/pending-users
 * Access: Admin only
 *
 * Returns all users from DynamoDB Users table where status = "PENDING"
 *
 * Environment variables:
 *   USERS_TABLE_NAME  – DynamoDB table name
 */

import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

export const handler = async (event) => {
  try {
    // ── Verify Admin ───────────────────────────────────────
    const claims = event.requestContext?.authorizer?.claims || {};
    const callerGroups = (claims['cognito:groups'] || '').split(',');
    if (!callerGroups.includes('Admin')) {
      return { statusCode: 403, headers, body: JSON.stringify({ message: 'Forbidden: Admin only' }) };
    }

    // ── Scan for PENDING users ─────────────────────────────
    const result = await dynamo.send(new ScanCommand({
      TableName:        process.env.USERS_TABLE_NAME,
      FilterExpression: '#status = :pending',
      ExpressionAttributeNames:  { '#status': 'status' },
      ExpressionAttributeValues: { ':pending': { S: 'PENDING' } },
    }));

    const users = (result.Items || []).map(unmarshall);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ users, count: users.length }),
    };
  } catch (err) {
    console.error('getPendingUsers error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error', error: err.message }),
    };
  }
};
