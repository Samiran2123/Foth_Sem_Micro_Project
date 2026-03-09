import { CheckCircle, Clock, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const attendancePct = 85;
  const stats = [
    { label: 'Overall Attendance', value: `${attendancePct}%`, color: 'text-green-400' },
    { label: 'Classes Attended', value: '34/40', color: 'text-blue-400' },
    { label: 'Classes Missed', value: '6', color: 'text-red-400' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Welcome Back, Alex</h1>
        <Link
          to="/student/scan"
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all shadow-lg shadow-blue-600/20"
        >
          <QrCode className="w-5 h-5 mr-2" />
          Scan Attendance QR
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="card bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Attendance Progress Bar */}
      <div className="card bg-gray-900 p-6 rounded-xl border border-gray-800">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-white">Attendance Progress</h2>
          <span className={`text-sm font-bold ${attendancePct >= 75 ? 'text-green-400' : 'text-red-400'}`}>{attendancePct}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ease-out ${attendancePct >= 75 ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}
            style={{ width: `${attendancePct}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">Minimum required: 75%</p>
      </div>

      {/* Recent Attendance */}
      <div className="card bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Recent Attendance</h2>
        </div>
        <div className="divide-y divide-gray-800 p-4">
          {[
            { subject: 'Computer Networks', time: 'Today, 10:30 AM', present: true },
            { subject: 'Operating Systems', time: 'Yesterday, 1:00 PM', present: true },
            { subject: 'Mathematics IV', time: 'Yesterday, 9:00 AM', present: false },
          ].map((record, idx) => (
            <div key={idx} className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${record.present ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
                  {record.present ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Clock className="w-5 h-5 text-red-400" />}
                </div>
                <div>
                  <p className="font-medium text-white">{record.subject}</p>
                  <p className="text-sm text-gray-400">{record.time}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${record.present ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {record.present ? 'Present' : 'Absent'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
