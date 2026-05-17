/**
 * Lambda: rejectUser
 *
 * Route:  POST /auth/reject-user
 * Access: Admin only
 *
 * Body: { userId: string }
 *
 * Actions:
 *  1. Updates DynamoDB status → "REJECTED"
 *  2. Optionally disables the Cognito user
 */

import { CognitoIdentityProviderClient, AdminDisableUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

const cognito = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });
const dynamo  = new DynamoDBClient({ region: process.env.AWS_REGION });

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

export const handler = async (event) => {
  try {
    const claims = event.requestContext?.authorizer?.claims || {};
    const callerGroups = (claims['cognito:groups'] || '').split(',');
    if (!callerGroups.includes('Admin')) {
      return { statusCode: 403, headers, body: JSON.stringify({ message: 'Forbidden: Admin only' }) };
    }

    const { userId } = JSON.parse(event.body || '{}');
    if (!userId) {
      return { statusCode: 400, headers, body: JSON.stringify({ message: 'userId is required' }) };
    }

    // 1. Disable Cognito user so they cannot sign in
    await cognito.send(new AdminDisableUserCommand({
      UserPoolId: process.env.USER_POOL_ID,
      Username:   userId,
    }));

    // 2. Update DynamoDB
    await dynamo.send(new UpdateItemCommand({
      TableName: process.env.USERS_TABLE_NAME,
      Key: marshall({ userId }),
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames:  { '#status': 'status' },
      ExpressionAttributeValues: marshall({
        ':status':    'REJECTED',
        ':updatedAt': new Date().toISOString(),
      }),
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: `User ${userId} rejected and disabled.` }),
    };
  } catch (err) {
    console.error('rejectUser error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error', error: err.message }),
    };
  }
};
