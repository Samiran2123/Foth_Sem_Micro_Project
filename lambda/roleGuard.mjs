/**
 * Lambda: roleGuard  (middleware utility, import in other Lambdas)
 *
 * Shared helper to enforce RBAC in Lambda functions.
 * Import this and call checkRole(event, ['Admin']) before your logic.
 *
 * Usage:
 *   import { checkRole, getCallerInfo } from './roleGuard.mjs';
 *
 *   export const handler = async (event) => {
 *     const guard = checkRole(event, ['Teacher']);
 *     if (guard) return guard;   // returns 403 response
 *     ...
 *   };
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

/**
 * Returns a 403 response if the caller is NOT in one of the allowedGroups.
 * Returns null if access is granted.
 */
export const checkRole = (event, allowedGroups) => {
  const claims = event.requestContext?.authorizer?.claims || {};
  const rawGroups = claims['cognito:groups'] || '';
  const callerGroups = rawGroups.split(',').map((g) => g.trim());

  const allowed = allowedGroups.some((g) => callerGroups.includes(g));
  if (!allowed) {
    return {
      statusCode: 403,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        message: `Forbidden. Required role(s): ${allowedGroups.join(', ')}`,
      }),
    };
  }
  return null; // Access granted
};

/**
 * Extracts the caller's identity from the Cognito authorizer claims.
 */
export const getCallerInfo = (event) => {
  const claims = event.requestContext?.authorizer?.claims || {};
  return {
    sub:      claims.sub,
    username: claims['cognito:username'],
    email:    claims.email,
    groups:   (claims['cognito:groups'] || '').split(',').map((g) => g.trim()),
    role:     claims['custom:role'],
    status:   claims['custom:status'],
  };
};

/** Standard CORS headers for all Lambda responses */
export { CORS_HEADERS };
