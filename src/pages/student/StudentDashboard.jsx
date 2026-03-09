import { CheckCircle, Clock } from 'lucide-react';

const StudentDashboard = () => {
  const stats = [
    { label: 'Overall Attendance', value: '85%', color: 'text-green-400' },
    { label: 'Classes Attended', value: '34/40', color: 'text-blue-400' },
    { label: 'Classes Missed', value: '6', color: 'text-red-400' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Welcome Back, Alex</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="card bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="card bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Recent Attendance</h2>
        </div>
        <div className="divide-y divide-gray-800 p-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-white">Computer Networks</p>
                <p className="text-sm text-gray-400">Today, 10:30 AM</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-medium">Present</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-800 rounded-lg">
                <Clock className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium text-white">Operating Systems</p>
                <p className="text-sm text-gray-400">Yesterday, 1:00 PM</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-medium">Present</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
