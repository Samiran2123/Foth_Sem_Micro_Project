/**
 * ProtectedRoute.jsx
 * Wraps a React Router route to enforce:
 *  1. Authentication (redirect to /login if not logged in)
 *  2. Role-based authorization (show 403 if wrong role)
 *  3. Loading spinner while session is being verified
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Loader2 } from 'lucide-react';

// ── Full-page spinner ────────────────────────────────────────
const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      <p className="text-gray-400 text-sm">Verifying session…</p>
    </div>
  </div>
);

// ── 403 Forbidden screen ─────────────────────────────────────
const ForbiddenScreen = ({ requiredRole }) => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-red-900/20 rounded-full">
          <Shield className="w-12 h-12 text-red-500" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-3">Access Denied</h1>
      <p className="text-gray-400 mb-2">
        This area requires <span className="text-red-400 font-semibold capitalize">{requiredRole}</span> privileges.
      </p>
      <p className="text-gray-500 text-sm mb-8">Your current role does not have permission to access this page.</p>
      <a
        href="/login"
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/30"
      >
        Back to Login
      </a>
    </div>
  </div>
);

/**
 * <ProtectedRoute allowedRoles={['admin', 'teacher']} />
 *
 * - allowedRoles: array of role strings. If omitted, any authenticated user passes.
 * - redirectTo:   where to send unauthenticated users (default '/login')
 */
const ProtectedRoute = ({
  allowedRoles = [],
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isLoading, role } = useAuth();

  if (isLoading) return <LoadingScreen />;

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <ForbiddenScreen requiredRole={allowedRoles[0]} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
