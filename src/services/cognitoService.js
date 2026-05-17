/**
 * cognitoService.js
 * Low-level AWS Cognito helpers (amazon-cognito-identity-js)
 * All higher-level auth logic lives in AuthContext.
 */

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import awsConfig from '../config/aws-config';

// ── Pool singleton ──────────────────────────────────────────
const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.userPoolId,
  ClientId:   awsConfig.userPoolClientId,
});

// ── Helpers ─────────────────────────────────────────────────

/** Return the currently authenticated CognitoUser, or null */
export const getCurrentCognitoUser = () => userPool.getCurrentUser();

/**
 * Sign in a user.
 * @returns {Promise<{ user, session, groups }>}
 */
export const signIn = (username, password) =>
  new Promise((resolve, reject) => {
    const authDetails = new AuthenticationDetails({ Username: username, Password: password });
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session) => {
        const idTokenPayload = session.getIdToken().decodePayload();
        const groups = idTokenPayload['cognito:groups'] || [];
        resolve({ user: cognitoUser, session, groups });
      },
      onFailure: reject,
      newPasswordRequired: (userAttributes) => {
        // Expose this so the UI can prompt for a new password
        reject({ code: 'NewPasswordRequired', userAttributes, cognitoUser });
      },
    });
  });

/**
 * Complete the new-password-required challenge (first login).
 */
export const completeNewPassword = (cognitoUser, newPassword) =>
  new Promise((resolve, reject) => {
    cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
      onSuccess: (session) => resolve(session),
      onFailure: reject,
    });
  });

/**
 * Register a new user – stored as PENDING until admin approves.
 * Custom attribute `custom:status` = 'PENDING'
 * Custom attribute `custom:role`   = 'PENDING'
 */
export const signUp = ({ username, password, email, fullName, phone }) =>
  new Promise((resolve, reject) => {
    const attributes = [
      new CognitoUserAttribute({ Name: 'email',          Value: email }),
      new CognitoUserAttribute({ Name: 'name',           Value: fullName }),
      new CognitoUserAttribute({ Name: 'custom:status',  Value: 'PENDING' }),
      new CognitoUserAttribute({ Name: 'custom:role',    Value: 'PENDING' }),
    ];
    if (phone) {
      attributes.push(new CognitoUserAttribute({ Name: 'phone_number', Value: phone }));
    }

    userPool.signUp(username, password, attributes, null, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

/** Confirm signup with the code sent to email */
export const confirmSignUp = (username, code) =>
  new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

/** Resend confirmation code */
export const resendConfirmationCode = (username) =>
  new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

/** Sign out (global) */
export const signOut = () => {
  const user = userPool.getCurrentUser();
  if (user) user.globalSignOut({ onSuccess: () => {}, onFailure: () => {} });
  // Always clear local storage regardless
  user?.signOut();
};

/**
 * Refresh the session and return the latest ID token.
 * Call this on app load to restore session.
 */
export const getValidSession = () =>
  new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (!user) return reject(new Error('No current user'));

    user.getSession((err, session) => {
      if (err || !session.isValid()) return reject(err || new Error('Session invalid'));
      resolve(session);
    });
  });

/** Get the raw JWT id token string */
export const getIdToken = async () => {
  const session = await getValidSession();
  return session.getIdToken().getJwtToken();
};

/** Decode token payload without verifying (client-side) */
export const decodeIdToken = async () => {
  const session = await getValidSession();
  return session.getIdToken().decodePayload();
};

/** Initiate forgot-password flow */
export const forgotPassword = (username) =>
  new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    cognitoUser.forgotPassword({
      onSuccess: resolve,
      onFailure: reject,
    });
  });

/** Confirm password reset with code */
export const confirmForgotPassword = (username, code, newPassword) =>
  new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
