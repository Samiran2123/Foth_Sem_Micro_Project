import { BarChart3, TrendingUp, TrendingDown, Users } from 'lucide-react';

const AdminReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Attendance Reports</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-700 bg-gray-900 text-gray-200 rounded-lg hover:bg-gray-800/50 text-sm font-medium">
            Export CSV
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
            Generate PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Overall Attendance</h3>
            <BarChart3 className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-white">88.5%</span>
            <span className="ml-2 flex items-center text-sm text-green-400 font-medium mb-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +2.1%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Compared to last month</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Avg. Daily Scans</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-white">3,450</span>
            <span className="ml-2 flex items-center text-sm text-red-400 font-medium mb-1">
              <TrendingDown className="w-4 h-4 mr-1" /> -1.4%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Unique successful scans</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 font-medium">Location Rejections</h3>
            <MapPinIcon className="w-5 h-5 text-red-400" />
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

      <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 border-t-4 border-t-indigo-500 p-6">
        <h2 className="text-lg font-bold text-white mb-6">Subject-wise Average Attendance</h2>
        
        {/* Mock visual bars */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-1 font-medium">
              <span className="text-gray-200">Software Engineering</span>
              <span className="text-blue-400">92%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1 font-medium">
              <span className="text-gray-200">Computer Networks</span>
              <span className="text-blue-400">85%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div className="bg-blue-900/200 h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1 font-medium">
              <span className="text-gray-200">Database Systems</span>
              <span className="text-blue-400">76%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: '76%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1 font-medium">
              <span className="text-gray-200">Mathematics IV</span>
              <span className="text-blue-400">62%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div className="bg-red-400 h-2.5 rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MapPin missing from icon imports in visual so define a quick workaround or add it to imports
const MapPinIcon = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
);

export default AdminReports;
