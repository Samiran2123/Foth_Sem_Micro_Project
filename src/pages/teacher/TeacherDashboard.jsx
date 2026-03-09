import { Link } from 'react-router-dom';
import { Users, FileText, CheckCircle } from 'lucide-react';

const TeacherDashboard = () => {
  const stats = [
    { label: 'Total Students', value: '120', color: 'text-blue-400' },
    { label: 'Active Sessions', value: '1', color: 'text-green-400' },
    { label: 'Completed Classes', value: '45', color: 'text-red-400' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Teacher Overview</h1>
        <Link 
          to="/teacher/qr-generate"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-lg shadow-blue-600/20"
        >
          Generate QR Code
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="card bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-gray-900 rounded-xl border border-gray-800 p-6 border-l-4 border-l-green-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Current Session</h2>
              <p className="text-sm text-gray-400">Software Engineering (CS401)</p>
            </div>
            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-bold animate-pulse">Running</span>
          </div>
          <div className="flex items-center text-sm text-gray-300 mb-6">
            <Users className="w-4 h-4 mr-2" />
            45/60 Students Present
          </div>
          <Link 
            to="/teacher/qr-generate"
            className="w-full block text-center py-2 bg-blue-900/20 text-blue-400 rounded-lg hover:bg-blue-900/40 font-medium transition-all border border-blue-800/30"
          >
            Manage Session View
          </Link>
        </div>

        <div className="card bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-bold text-white mb-4">Recent Classes</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-200">Database Systems</p>
                  <p className="text-xs text-gray-500">Yesterday, 9:00 AM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-200">58/60</p>
                <p className="text-xs text-green-400 flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> 96%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
