import { BarChart3, TrendingUp, TrendingDown, MapPin } from 'lucide-react';

const AdminReports = () => {
  const subjects = [
    { name: 'Software Engineering', pct: 92, color: 'bg-blue-500' },
    { name: 'Computer Networks', pct: 85, color: 'bg-blue-400' },
    { name: 'Database Systems', pct: 76, color: 'bg-amber-400' },
    { name: 'Mathematics IV', pct: 62, color: 'bg-red-400' },
    { name: 'Operating Systems', pct: 88, color: 'bg-green-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Attendance Reports</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded-lg hover:bg-gray-800 text-sm font-medium transition-all">
            Export CSV
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all shadow-lg shadow-blue-600/20">
            Generate PDF
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Overall Attendance</h3>
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-white">88.5%</span>
            <span className="ml-2 flex items-center text-sm text-green-400 font-medium mb-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +2.1%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Compared to last month</p>
        </div>

        <div className="card bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Avg. Daily Scans</h3>
            <BarChart3 className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-white">3,450</span>
            <span className="ml-2 flex items-center text-sm text-red-400 font-medium mb-1">
              <TrendingDown className="w-4 h-4 mr-1" /> -1.4%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Unique successful scans</p>
        </div>

        <div className="card bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Location Rejections</h3>
            <MapPin className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-white">124</span>
            <span className="ml-2 flex items-center text-sm text-green-400 font-medium mb-1">
              <TrendingDown className="w-4 h-4 mr-1" /> -12%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Out of 50m radius boundary</p>
        </div>
      </div>

      {/* Subject-wise Bars */}
      <div className="card bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-bold text-white mb-6">Subject-wise Average Attendance</h2>
        <div className="space-y-5">
          {subjects.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-200">{s.name}</span>
                <span className={`font-bold ${s.pct >= 80 ? 'text-green-400' : s.pct >= 70 ? 'text-amber-400' : 'text-red-400'}`}>{s.pct}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div className={`${s.color} h-2.5 rounded-full transition-all duration-700`} style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
