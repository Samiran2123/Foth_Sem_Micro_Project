/**
 * Lambda: getAllUsers
 *
 * Route:  GET /auth/users
 * Access: Admin only
 *
 * Returns all users from the Users DynamoDB table.
 *
 * Environment variables:
 *   USERS_TABLE_NAME
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
    const claims = event.requestContext?.authorizer?.claims || {};
    const callerGroups = (claims['cognito:groups'] || '').split(',');
    if (!callerGroups.includes('Admin')) {
      return { statusCode: 403, headers, body: JSON.stringify({ message: 'Forbidden: Admin only' }) };
    }

    const result = await dynamo.send(new ScanCommand({
      TableName: process.env.USERS_TABLE_NAME,
    }));

    const users = (result.Items || [])
      .map(unmarshall)
      // Do not expose password hashes or sensitive fields
      .map(({ password, ...rest }) => rest);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ users, count: users.length }),
    };
  } catch (err) {
    console.error('getAllUsers error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error', error: err.message }),
    };
  }
};
