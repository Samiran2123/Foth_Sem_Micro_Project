import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CalendarCheck, KeyRound, Lock, Eye, EyeOff } from 'lucide-react';

const SchedulerLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/scheduler/dashboard');
    }, 800);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-amber-900/30 rounded-xl">
          <CalendarCheck className="w-7 h-7 text-amber-400" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-1">Class Scheduler Login</h2>
      <p className="text-gray-400 text-sm text-center mb-6">Schedule & organize all classes</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Scheduler ID</label>
          <div className="relative">
            <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="e.g. SCH001"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
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
              className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all ${loading ? 'bg-amber-800' : 'bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-600/20'}`}
        >
          {loading ? 'Signing in...' : 'Sign In as Scheduler'}
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

export default SchedulerLogin;
