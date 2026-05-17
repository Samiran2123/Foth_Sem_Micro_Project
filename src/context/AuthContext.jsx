/**
 * AuthContext.jsx
 * Global authentication state + helpers available via useAuth()
 *
 * State shape:
 *   user       – decoded Cognito ID token payload (or null)
 *   role       – 'admin' | 'teacher' | 'scheduler' | 'student' | null
 *   isLoading  – true while checking stored session on first mount
 *   isAuthenticated
 */

import { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import awsConfig from '../config/aws-config';
import {
  signIn as cognitoSignIn,
  signUp as cognitoSignUp,
  confirmSignUp as cognitoConfirmSignUp,
  resendConfirmationCode as cognitoResendCode,
  signOut as cognitoSignOut,
  getValidSession,
  decodeIdToken,
  forgotPassword as cognitoForgotPassword,
  confirmForgotPassword as cognitoConfirmForgotPassword,
  completeNewPassword as cognitoCompleteNewPassword,
} from '../services/cognitoService';

// ── Context ──────────────────────────────────────────────────
const AuthContext = createContext(null);

// ── Reducer ──────────────────────────────────────────────────
const initialState = {
  user: null,
  role: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.role,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

// ── Role resolution (from Cognito groups) ────────────────────
const resolveRole = (groups = []) => {
  const g = awsConfig.groups;
  if (groups.includes(g.ADMIN))     return 'admin';
  if (groups.includes(g.TEACHER))   return 'teacher';
  if (groups.includes(g.SCHEDULER)) return 'scheduler';
  if (groups.includes(g.STUDENT))   return 'student';
  return null; // PENDING / unassigned
};

// ── Provider ─────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ── Restore session on mount ─────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const session  = await getValidSession();
        const payload  = session.getIdToken().decodePayload();
        const groups   = payload['cognito:groups'] || [];
        const role     = resolveRole(groups);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: payload, role } });
      } catch {
        dispatch({ type: 'LOGOUT' });
      }
    };
    restoreSession();
  }, []);

  // ── Login ────────────────────────────────────────────────
  const login = useCallback(async (username, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { session, groups } = await cognitoSignIn(username, password);
      const payload = session.getIdToken().decodePayload();
      const role    = resolveRole(groups);

      if (!role) {
        // Account exists but not approved yet
        cognitoSignOut();
        throw new Error('ACCOUNT_PENDING');
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: payload, role } });
      return { success: true, role };
    } catch (err) {
      const message = err.message === 'ACCOUNT_PENDING'
        ? 'Your account is pending admin approval.'
        : err.message || 'Sign-in failed.';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw { ...err, friendlyMessage: message };
    }
  }, []);

  // ── Admin login (direct, same flow but expects Admin group) ─
  const adminLogin = useCallback(async (username, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { session, groups } = await cognitoSignIn(username, password);
      if (!groups.includes(awsConfig.groups.ADMIN)) {
        cognitoSignOut();
        throw new Error('NOT_ADMIN');
      }
      const payload = session.getIdToken().decodePayload();
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: payload, role: 'admin' } });
      return { success: true };
    } catch (err) {
      const message = err.message === 'NOT_ADMIN'
        ? 'Access denied: not an admin account.'
        : err.message || 'Sign-in failed.';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw { ...err, friendlyMessage: message };
    }
  }, []);

  // ── Register (PENDING status, no group) ─────────────────
  const register = useCallback(async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await cognitoSignUp(userData);
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: true, result };
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
      throw err;
    }
  }, []);

  // ── Confirm registration ─────────────────────────────────
  const confirmRegistration = useCallback(async (username, code) => {
    return cognitoConfirmSignUp(username, code);
  }, []);

  // ── Resend code ──────────────────────────────────────────
  const resendCode = useCallback(async (username) => {
    return cognitoResendCode(username);
  }, []);

  // ── Logout ───────────────────────────────────────────────
  const logout = useCallback(() => {
    cognitoSignOut();
    dispatch({ type: 'LOGOUT' });
  }, []);

  // ── Forgot Password ──────────────────────────────────────
  const forgotPassword = useCallback(async (username) => {
    return cognitoForgotPassword(username);
  }, []);

  // ── Confirm Password Reset ───────────────────────────────
  const confirmPasswordReset = useCallback(async (username, code, newPassword) => {
    return cognitoConfirmForgotPassword(username, code, newPassword);
  }, []);

  // ── Complete New Password Challenge ──────────────────────
  const completeNewPassword = useCallback(async (cognitoUser, newPassword) => {
    return cognitoCompleteNewPassword(cognitoUser, newPassword);
  }, []);

  // ── Role helpers ─────────────────────────────────────────
  const isAdmin     = state.role === 'admin';
  const isTeacher   = state.role === 'teacher';
  const isScheduler = state.role === 'scheduler';
  const isStudent   = state.role === 'student';

  const hasRole = (...roles) => roles.includes(state.role);

  // ── Dashboard path for redirect after login ──────────────
  const getDashboardPath = () => {
    switch (state.role) {
      case 'admin':     return '/admin/dashboard';
      case 'teacher':   return '/teacher/dashboard';
      case 'scheduler': return '/scheduler/dashboard';
      case 'student':   return '/student/dashboard';
      default:          return '/login';
    }
  };

  const value = {
    ...state,
    login,
    adminLogin,
    register,
    confirmRegistration,
    resendCode,
    logout,
    forgotPassword,
    confirmPasswordReset,
    completeNewPassword,
    isAdmin,
    isTeacher,
    isScheduler,
    isStudent,
    hasRole,
    getDashboardPath,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ─────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export default AuthContext;
