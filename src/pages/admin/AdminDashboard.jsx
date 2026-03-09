import { Users, GraduationCap, Building, Activity, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Students', value: '1,240', icon: Users, color: 'text-blue-400', bg: 'bg-blue-900/20' },
    { label: 'Total Teachers', value: '45', icon: GraduationCap, color: 'text-red-400', bg: 'bg-red-900/20' },
    { label: 'Active Classes', value: '8', icon: Activity, color: 'text-green-400', bg: 'bg-green-900/20' },
    { label: 'Departments', value: '6', icon: Building, color: 'text-amber-400', bg: 'bg-amber-900/20' }
  ];

  const weeklyData = [
    { day: 'Mon', pct: 92 },
    { day: 'Tue', pct: 88 },
    { day: 'Wed', pct: 80 },
    { day: 'Thu', pct: 94 },
    { day: 'Fri', pct: 75 },
    { day: 'Sat', pct: 60 },
  ];

  const deptData = [
    { dept: 'Computer Science', pct: 91, color: 'bg-blue-500' },
    { dept: 'Mathematics', pct: 78, color: 'bg-red-500' },
    { dept: 'Electronics', pct: 85, color: 'bg-amber-500' },
    { dept: 'Physics', pct: 82, color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">System Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="card bg-gray-900 p-6 rounded-xl border border-gray-800 flex items-center">
              <div className={`p-4 rounded-lg ${stat.bg} ${stat.color} mr-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Attendance Ring Chart (placeholder) */}
        <div className="card bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            Attendance Percentage
          </h2>
          <div className="flex items-center justify-center py-6">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-40 h-40 transform -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#1f2937" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="88.5, 100"
                  strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-white">88.5%</span>
                <span className="text-xs text-gray-400">Overall</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Trend Bar Chart */}
        <div className="card bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-bold text-white mb-4">Weekly Attendance Trend</h2>
          <div className="flex items-end justify-between gap-3 h-48 pt-4">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center">
                <span className="text-xs text-gray-400 mb-1">{d.pct}%</span>
                <div className="w-full bg-gray-800 rounded-t-md overflow-hidden" style={{ height: '160px' }}>
                  <div
                    className={`w-full rounded-t-md transition-all duration-700 ease-out ${d.pct >= 80 ? 'bg-blue-500' : d.pct >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ height: `${d.pct}%`, marginTop: `${100 - d.pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department-wise Comparison */}
      <div className="card bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-bold text-white mb-6">Department-wise Attendance</h2>
        <div className="space-y-5">
          {deptData.map((d) => (
            <div key={d.dept}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-200">{d.dept}</span>
                <span className="font-bold text-white">{d.pct}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div className={`${d.color} h-2.5 rounded-full transition-all duration-700`} style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Logs */}
      <div className="card bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">Recent Admin Logs</h2>
        </div>
        <div className="divide-y divide-gray-800 p-4">
          {[
            { title: 'New Teacher Added', detail: 'Dr. Sarah Miller (Computer Science)', time: '10 mins ago' },
            { title: 'Class Schedule Updated', detail: 'Database Systems moved to Lab 4', time: '1 hour ago' },
            { title: 'System Report Generated', detail: 'Monthly Attendance Summary', time: '5 hours ago' },
          ].map((log, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-white">{log.title}</p>
                <p className="text-sm text-gray-400">{log.detail}</p>
              </div>
              <span className="text-xs text-gray-500">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
