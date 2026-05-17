/**
 * SchedulerLogin.jsx
 * Class Scheduler portal login wired to Cognito.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarCheck, KeyRound, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SchedulerLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [showPassword, setShowPass] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { role } = await login(username.trim(), password);
      if (role !== 'scheduler') {
        setError('This portal is for class schedulers only.');
        return;
      }
      navigate('/scheduler/dashboard', { replace: true });
    } catch (err) {
      setError(err.friendlyMessage || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-amber-900/30 rounded-xl">
          <CalendarCheck className="w-7 h-7 text-amber-400" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-1">Class Scheduler Login</h2>
      <p className="text-gray-400 text-sm text-center mb-6">Schedule &amp; organise all classes</p>

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Scheduler ID / Username</label>
          <div className="relative">
            <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="scheduler-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. SCH001"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
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
              id="scheduler-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
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

        <div className="text-right text-xs">
          <Link to="/forgot-password" className="text-amber-400 hover:text-amber-300">Forgot password?</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all ${
            loading ? 'bg-amber-800 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-600/20'
          }`}
        >
          {loading ? 'Signing in…' : 'Sign In as Scheduler'}
        </button>
      </form>

      <div className="mt-5 p-3 bg-blue-900/10 border border-blue-500/20 rounded-lg text-center">
        <p className="text-xs text-blue-400/80">
          Scheduler accounts are provisioned by the Admin.
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

export default SchedulerLogin;
