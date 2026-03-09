import { CalendarCheck, BookOpen, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const SchedulerDashboard = () => {
  const stats = [
    { label: 'Total Classes Scheduled', value: '32', color: 'text-amber-400' },
    { label: 'Active Today', value: '6', color: 'text-green-400' },
    { label: 'Upcoming This Week', value: '18', color: 'text-blue-400' },
  ];

  const todayClasses = [
    { id: 1, subject: 'Software Engineering', teacher: 'Dr. Sarah Miller', time: '10:00 AM', room: 'Room 301', status: 'Ongoing' },
    { id: 2, subject: 'Database Systems', teacher: 'Dr. Michael Brown', time: '12:00 PM', room: 'Lab 4', status: 'Upcoming' },
    { id: 3, subject: 'Computer Networks', teacher: 'Dr. Sarah Miller', time: '02:00 PM', room: 'Room 305', status: 'Upcoming' },
    { id: 4, subject: 'Mathematics IV', teacher: 'Prof. John Davis', time: '04:00 PM', room: 'Room 102', status: 'Upcoming' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Scheduler Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Organize & manage all class schedules</p>
        </div>
        <Link
          to="/scheduler/add-class"
          className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium transition-all shadow-lg shadow-amber-600/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Class
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="card bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="card bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white flex items-center">
            <CalendarCheck className="w-5 h-5 mr-2 text-amber-400" />
            Today's Classes
          </h2>
          <span className="text-xs text-gray-500">March 10, 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
              <tr>
                <th className="px-6 py-3">Subject</th>
                <th className="px-6 py-3">Teacher</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Room</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {todayClasses.map((cls) => (
                <tr key={cls.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                    {cls.subject}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{cls.teacher}</td>
                  <td className="px-6 py-4 text-gray-300 flex items-center">
                    <Clock className="w-3 h-3 mr-1.5 text-gray-500" />
                    {cls.time}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{cls.room}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      cls.status === 'Ongoing'
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-blue-900/20 text-blue-400'
                    }`}>
                      {cls.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchedulerDashboard;
