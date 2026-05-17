/**
 * AdminLogin.jsx
 * Admin-only login page. Uses adminLogin() which verifies
 * the user is in the Cognito "Admin" group before granting access.
 * No public signup link is shown.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, KeyRound, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const [username, setUsername]       = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPass]   = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await adminLogin(username.trim(), password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.friendlyMessage || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-green-900/30 rounded-xl">
          <Shield className="w-7 h-7 text-green-400" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-1">Admin Login</h2>
      <p className="text-gray-400 text-sm text-center mb-6">Restricted – authorised personnel only</p>

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Admin Username</label>
          <div className="relative">
            <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. superadmin"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              required
              autoComplete="username"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure password"
              className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all ${
            loading ? 'bg-green-800 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20'
          }`}
        >
          {loading ? 'Verifying…' : 'Sign In as Admin'}
        </button>
      </form>

      {/* Security notice instead of signup link */}
      <div className="mt-5 p-3 bg-amber-900/10 border border-amber-500/20 rounded-lg text-center">
        <p className="text-xs text-amber-500/80">
          🔒 Admin accounts are created by your system administrator only.
        </p>
      </div>

      <div className="mt-4 text-center">
        <Link to="/login" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Back to role selection
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
