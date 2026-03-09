import { Users, GraduationCap, Building, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Students', value: '1,240', icon: Users, color: 'text-blue-400', bg: 'bg-blue-900/20' },
    { label: 'Total Teachers', value: '45', icon: GraduationCap, color: 'text-red-400', bg: 'bg-red-900/20' },
    { label: 'Active Classes', value: '8', icon: Activity, color: 'text-green-400', bg: 'bg-green-900/20' },
    { label: 'Departments', value: '6', icon: Building, color: 'text-amber-400', bg: 'bg-amber-900/20' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">System Overview</h1>
      
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

      <div className="card bg-gray-900 rounded-xl border border-gray-800 mt-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">Recent Admin Logs</h2>
        </div>
        <div className="divide-y divide-gray-800 p-4">
          <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <p className="font-medium text-white">New Teacher Added</p>
              <p className="text-sm text-gray-400">Dr. Sarah Miller (Computer Science)</p>
            </div>
            <span className="text-xs text-gray-500">10 mins ago</span>
          </div>
          <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <p className="font-medium text-white">Class Schedule Updated</p>
              <p className="text-sm text-gray-400">Database Systems moved to Lab 4</p>
            </div>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
          <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <p className="font-medium text-white">System Report Generated</p>
              <p className="text-sm text-gray-400">Monthly Attendance Summary</p>
            </div>
            <span className="text-xs text-gray-500">5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
