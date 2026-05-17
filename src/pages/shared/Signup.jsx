/**
 * Signup.jsx
 * Public registration page for Students and Teachers.
 * - Collects user info and registers in Cognito with `custom:status = PENDING`
 * - Sends email verification code
 * - Redirects to /verify-email page after successful submission
 * - Admin sees an info banner that admin accounts cannot be self-registered
 */

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  User, Mail, Lock, Eye, EyeOff, Phone,
  AlertCircle, CheckCircle2, GraduationCap,
  UserPlus, ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ROLE_CONFIG = {
  student: {
    label:       'Student',
    accent:      'blue',
    icon:        User,
    placeholder: 'e.g. CS2024001',
    idLabel:     'Roll Number',
    namePH:      'Your full name',
  },
  teacher: {
    label:       'Teacher',
    accent:      'red',
    icon:        GraduationCap,
    placeholder: 'e.g. teacher01',
    idLabel:     'Teacher Username',
    namePH:      'Prof. Full Name',
  },
};

const ACCENT = {
  blue: { ring: 'focus:ring-blue-500 focus:border-blue-500', btn: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20', icon: 'text-blue-400', bg: 'bg-blue-900/30' },
  red:  { ring: 'focus:ring-red-500 focus:border-red-500',   btn: 'bg-red-600 hover:bg-red-700 shadow-red-600/20',   icon: 'text-red-400',  bg: 'bg-red-900/30' },
};

const Signup = () => {
  const { role = 'student' } = useParams();
  const navigate = useNavigate();
  const { register } = useAuth();

  const cfg    = ROLE_CONFIG[role] || ROLE_CONFIG.student;
  const colors = ACCENT[cfg.accent];
  const Icon   = cfg.icon;

  const [form, setForm]           = useState({ username: '', fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    if (form.password.length < 8)               return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(form.password))           return 'Password must contain an uppercase letter.';
    if (!/[0-9]/.test(form.password))           return 'Password must contain a number.';
    if (!/[^A-Za-z0-9]/.test(form.password))   return 'Password must contain a special character.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      await register({
        username: form.username.trim(),
        password: form.password,
        email:    form.email.trim().toLowerCase(),
        fullName: form.fullName.trim(),
        phone:    form.phone.trim() || undefined,
      });
      setSuccess(true);
      // Redirect to email verification page
      setTimeout(() => navigate(`/verify-email?username=${encodeURIComponent(form.username.trim())}`), 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full text-center py-4">
        <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Registration Submitted!</h2>
        <p className="text-gray-400 text-sm">
          A verification code has been sent to <span className="text-white">{form.email}</span>.
        </p>
        <p className="text-gray-500 text-xs mt-2">Redirecting to verification…</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <div className={`p-3 ${colors.bg} rounded-xl`}>
          <UserPlus className={`w-7 h-7 ${colors.icon}`} />
        </div>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-1">{cfg.label} Registration</h2>
      <p className="text-gray-400 text-sm text-center mb-6">
        Your account will be reviewed and approved by the Admin.
      </p>

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username / Roll No */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">{cfg.idLabel}</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="signup-username"
              type="text"
              value={form.username}
              onChange={set('username')}
              placeholder={cfg.placeholder}
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 ${colors.ring} outline-none transition-all`}
              required
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
          <input
            id="signup-name"
            type="text"
            value={form.fullName}
            onChange={set('fullName')}
            placeholder={cfg.namePH}
            className={`w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 ${colors.ring} outline-none transition-all`}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="signup-email"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@college.edu"
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 ${colors.ring} outline-none transition-all`}
              required
            />
          </div>
        </div>

        {/* Phone (optional) */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Phone (optional)</label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="signup-phone"
              type="tel"
              value={form.phone}
              onChange={set('phone')}
              placeholder="+91 9876543210"
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 ${colors.ring} outline-none transition-all`}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="signup-password"
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={set('password')}
              placeholder="Min 8 chars, uppercase, number, symbol"
              className={`w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 ${colors.ring} outline-none transition-all`}
              required
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="signup-confirm-password"
              type="password"
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
              placeholder="Repeat your password"
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 ${colors.ring} outline-none transition-all`}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all shadow-lg ${
            loading ? 'bg-gray-700 cursor-not-allowed' : `${colors.btn}`
          }`}
        >
          {loading ? 'Registering…' : (
            <>Register <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </form>

      <div className="mt-5 text-center">
        <span className="text-xs text-gray-500">
          Already have an account?{' '}
          <Link to={`/login/${role}`} className={`${colors.icon} hover:underline`}>Sign in</Link>
        </span>
      </div>
      <div className="mt-3 text-center">
        <Link to="/login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
          ← Back to role selection
        </Link>
      </div>
    </div>
  );
};

export default Signup;
