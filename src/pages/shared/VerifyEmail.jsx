/**
 * VerifyEmail.jsx
 * Handles Cognito email confirmation code entry after signup.
 * Query param: ?username=xxx
 */

import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Mail, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const username = params.get('username') || '';
  const { confirmRegistration, resendCode } = useAuth();

  const [code, setCode]         = useState('');
  const [loading, setLoading]   = useState(false);
  const [resending, setResend]  = useState(false);
  const [error, setError]       = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await confirmRegistration(username, code.trim());
      setVerified(true);
    } catch (err) {
      setError(err.message || 'Verification failed. Check your code and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResend(true);
    setError('');
    try {
      await resendCode(username);
    } catch (err) {
      setError(err.message || 'Could not resend code.');
    } finally {
      setResend(false);
    }
  };

  if (verified) {
    return (
      <div className="w-full text-center py-6">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Email Verified!</h2>
        <p className="text-gray-400 text-sm mb-6">
          Your account is now confirmed. Please wait for Admin approval before logging in.
        </p>
        <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-400 text-sm mb-6">
          📧 You will receive a notification once your account is approved.
        </div>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-blue-900/30 rounded-xl">
          <Mail className="w-7 h-7 text-blue-400" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-1">Verify Your Email</h2>
      <p className="text-gray-400 text-sm text-center mb-2">
        We sent a 6-digit code to your registered email.
      </p>
      {username && (
        <p className="text-blue-400 text-xs text-center mb-6">Account: <strong>{username}</strong></p>
      )}

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Verification Code</label>
          <input
            id="verify-code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="e.g. 123456"
            className="w-full text-center tracking-[0.5em] px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-lg font-bold placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          className="w-full py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20"
        >
          {loading ? 'Verifying…' : 'Confirm Email'}
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
          {resending ? 'Resending…' : 'Resend Code'}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
