/**
 * PendingApproval.jsx
 * Shown to users who have verified their email but haven't been approved yet.
 */

import { Link } from 'react-router-dom';
import { Clock, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PendingApproval = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-amber-900/20 rounded-full flex items-center justify-center">
              <Clock className="w-10 h-10 text-amber-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full animate-ping opacity-75" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">Account Pending Approval</h1>
        <p className="text-gray-400 mb-2">
          Hi <span className="text-white font-medium">{user?.name || user?.['cognito:username'] || 'there'}</span>,
        </p>
        <p className="text-gray-400 text-sm mb-6">
          Your registration has been received. The Admin will review and approve your account shortly.
          You'll be able to log in once your role has been assigned.
        </p>

        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 mb-6 text-left space-y-3">
          <h3 className="text-sm font-semibold text-white">What happens next?</h3>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-6 h-6 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">1</div>
            Admin reviews your registration request
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-6 h-6 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">2</div>
            Admin assigns your role (Student / Teacher / Scheduler)
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="w-6 h-6 rounded-full bg-green-900/30 text-green-400 flex items-center justify-center text-xs font-bold shrink-0">3</div>
            You receive access to your dashboard
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 mx-auto px-5 py-2.5 text-sm text-gray-400 hover:text-red-400 border border-gray-700 hover:border-red-500/50 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default PendingApproval;
