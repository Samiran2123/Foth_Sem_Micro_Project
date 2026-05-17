/**
 * TeacherLogin.jsx
 * Teachers log in with email (Cognito username) + password.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TeacherLogin = () => {
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
      if (role !== 'teacher') {
        setError('This portal is for teachers only. Please use the correct login portal.');
        return;
      }
      navigate('/teacher/dashboard', { replace: true });
    } catch (err) {
      setError(err.friendlyMessage || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-red-900/30 rounded-xl">
          <GraduationCap className="w-7 h-7 text-red-400" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-1">Teacher Login</h2>
      <p className="text-gray-400 text-sm text-center mb-6">Generate QR &amp; manage sessions</p>

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Email / Username</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="teacher-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="teacher@college.edu"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
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
              id="teacher-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
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

        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">New teacher?{' '}
            <Link to="/signup/teacher" className="text-red-400 hover:text-red-300">Register</Link>
          </span>
          <Link to="/forgot-password" className="text-red-400 hover:text-red-300">Forgot password?</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all ${
            loading ? 'bg-red-800 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20'
          }`}
        >
          {loading ? 'Signing in…' : 'Sign In as Teacher'}
        </button>
      </form>

      <div className="mt-5 text-center">
        <Link to="/login" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Back to role selection
        </Link>
      </div>
    </div>
  );
};

export default TeacherLogin;
