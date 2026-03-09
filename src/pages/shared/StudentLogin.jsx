import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/student/dashboard');
    }, 800);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-blue-900/30 rounded-xl">
          <User className="w-7 h-7 text-blue-400" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-1">Student Login</h2>
      <p className="text-gray-400 text-sm text-center mb-6">Scan QR & view your attendance</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Roll Number / Student ID</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="e.g. CS2024001"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <label className="flex items-center text-gray-400">
            <input type="checkbox" className="mr-2 rounded bg-gray-800 border-gray-700" />
            Remember me
          </label>
          <a href="#" className="text-blue-400 hover:text-blue-300">Forgot password?</a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all ${loading ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20'}`}
        >
          {loading ? 'Signing in...' : 'Sign In as Student'}
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

export default StudentLogin;
