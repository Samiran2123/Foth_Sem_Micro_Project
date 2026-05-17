/**
 * ForgotPassword.jsx
 * Two-step forgot-password flow:
 *  Step 1 – Enter username → Cognito sends code to email
 *  Step 2 – Enter code + new password → reset confirmed
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const { forgotPassword, confirmPasswordReset } = useAuth();

  const [step, setStep]           = useState(1); // 1 = enter username, 2 = enter code+pw, 3 = done
  const [username, setUsername]   = useState('');
  const [code, setCode]           = useState('');
  const [newPw, setNewPw]         = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  // Step 1 – Send code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await forgotPassword(username.trim());
      setStep(2);
    } catch (err) {
      setError(err.message || 'Could not send reset code. Check your username.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 – Confirm reset
  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    if (newPw.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      await confirmPasswordReset(username, code.trim(), newPw);
      setStep(3);
    } catch (err) {
      setError(err.message || 'Reset failed. Verify the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="w-full text-center py-6">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Password Reset!</h2>
        <p className="text-gray-400 text-sm mb-6">Your password has been updated successfully.</p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-blue-900/30 rounded-xl">
          <KeyRound className="w-7 h-7 text-blue-400" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-1">Forgot Password</h2>
      <p className="text-gray-400 text-sm text-center mb-6">
        {step === 1 ? "Enter your username to receive a reset code." : "Enter the code we sent to your email."}
      </p>

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Username / Roll Number</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                id="forgot-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Cognito username"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 transition-all shadow-lg shadow-blue-600/20"
          >
            {loading ? 'Sending…' : 'Send Reset Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Verification Code</label>
            <input
              id="reset-code"
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="6-digit code"
              className="w-full text-center tracking-[0.5em] px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-lg font-bold placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                id="reset-password"
                type={showPw ? 'text' : 'password'}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="Min 8 chars"
                className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 transition-all shadow-lg shadow-blue-600/20"
          >
            {loading ? 'Resetting…' : 'Reset Password'}
          </button>
          <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors">
            ← Use a different username
          </button>
        </form>
      )}

      <div className="mt-5 text-center">
        <Link to="/login" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
