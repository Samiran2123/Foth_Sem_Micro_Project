/**
 * ManageUsers.jsx  (Admin page)
 * Displays pending registrations + all users.
 * Admin can approve/reject pending accounts, delete users.
 * Calls the backend Lambda endpoints secured with Cognito Authorizer.
 */

import { useEffect, useState } from 'react';
import { Users, UserCheck, UserX, Clock, RefreshCw, AlertCircle, Shield } from 'lucide-react';
import { authApi } from '../../services/apiService';

const ROLE_OPTIONS = ['Student', 'Teacher', 'Scheduler'];

const StatusBadge = ({ status }) => {
  const MAP = {
    PENDING:  { cls: 'bg-amber-900/20 text-amber-400 border-amber-500/30', label: 'Pending' },
    APPROVED: { cls: 'bg-green-900/20 text-green-400 border-green-500/30', label: 'Approved' },
    REJECTED: { cls: 'bg-red-900/20  text-red-400  border-red-500/30',    label: 'Rejected' },
  };
  const s = MAP[status] || MAP.PENDING;
  return <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${s.cls}`}>{s.label}</span>;
};

const ManageUsers = () => {
  const [pendingUsers, setPending] = useState([]);
  const [allUsers, setAll]         = useState([]);
  const [loading, setLoading]      = useState(true);
  const [error, setError]          = useState('');
  const [actionId, setActionId]    = useState(null);
  const [selectedRole, setRole]    = useState({});

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [pendingRes, allRes] = await Promise.all([
        authApi.getPendingUsers(),
        authApi.getAllUsers(),
      ]);
      setPending(pendingRes.data?.users || []);
      setAll(allRes.data?.users || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users. Check API connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleApprove = async (userId) => {
    const role = selectedRole[userId];
    if (!role) { alert('Please select a role before approving.'); return; }
    setActionId(userId);
    try {
      await authApi.approveUser(userId, role);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve user.');
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (userId) => {
    if (!window.confirm('Reject this user? They will not be able to log in.')) return;
    setActionId(userId);
    try {
      await authApi.rejectUser(userId);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject user.');
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-400" /> User Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">Approve registrations and manage role assignments</p>
        </div>
        <button onClick={fetchData} disabled={loading} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Pending Approvals */}
      <section>
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-amber-400" />
          Pending Approvals
          {pendingUsers.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-400 rounded-full">{pendingUsers.length}</span>
          )}
        </h2>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading…</div>
        ) : pendingUsers.length === 0 ? (
          <div className="text-center py-8 bg-gray-900 rounded-xl border border-gray-800 text-gray-500">
            ✅ No pending approvals
          </div>
        ) : (
          <div className="space-y-3">
            {pendingUsers.map((u) => (
              <div key={u.userId} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{u.name || u.username}</p>
                  <p className="text-sm text-gray-400">{u.email}</p>
                  <p className="text-xs text-gray-500 mt-1">ID: {u.userId} • Registered: {new Date(u.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedRole[u.userId] || ''}
                    onChange={(e) => setRole((r) => ({ ...r, [u.userId]: e.target.value }))}
                    className="px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option value="" disabled>Assign role…</option>
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleApprove(u.userId)}
                    disabled={actionId === u.userId}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm bg-green-700 hover:bg-green-600 text-white rounded-lg transition-all disabled:opacity-50"
                  >
                    <UserCheck className="w-4 h-4" /> Approve
                  </button>

                  <button
                    onClick={() => handleReject(u.userId)}
                    disabled={actionId === u.userId}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm bg-red-900/40 hover:bg-red-800 text-red-400 rounded-lg transition-all disabled:opacity-50"
                  >
                    <UserX className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* All Users */}
      <section>
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-400" /> All Users ({allUsers.length})
        </h2>

        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">Loading…</td></tr>
                ) : allUsers.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">No users found</td></tr>
                ) : allUsers.map((u) => (
                  <tr key={u.userId} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{u.name || '—'}</td>
                    <td className="px-4 py-3 text-gray-400">{u.username}</td>
                    <td className="px-4 py-3 text-gray-400">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-900/20 text-blue-400 border border-blue-500/30">
                        {u.role || 'PENDING'}
                      </span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={u.status || 'PENDING'} /></td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageUsers;
