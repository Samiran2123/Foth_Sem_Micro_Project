import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const ScheduleClass = () => {
  const schedule = [
    { id: 1, subject: 'Software Engineering', teacher: 'Dr. Sarah Miller', time: '10:00 AM - 11:30 AM', room: 'Room 301', days: 'Mon, Wed, Fri' },
    { id: 2, subject: 'Database Systems', teacher: 'Dr. Michael Brown', time: '12:00 PM - 01:30 PM', room: 'Lab 4', days: 'Tue, Thu' },
    { id: 3, subject: 'Computer Networks', teacher: 'Dr. Sarah Miller', time: '02:00 PM - 03:30 PM', room: 'Room 305', days: 'Wed, Fri' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Class Schedule</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
          Add Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly View (Left) */}
        <div className="lg:col-span-2 bg-gray-900 rounded-xl shadow-sm border border-gray-800 p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-blue-400" />
            Weekly Routine
          </h2>
          <div className="space-y-4">
            {schedule.map(session => (
              <div key={session.id} className="block border border-gray-800 rounded-lg p-4 hover:border-blue-700 hover:shadow-sm transition-all bg-gray-800/50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white text-lg">{session.subject}</h3>
                  <span className="text-xs font-bold bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                    {session.days}
                  </span>
                </div>
                <div className="flex flex-wrap text-sm text-gray-300 gap-4 mt-3">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-500" />
                    {session.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                    {session.room}
                  </div>
                  <div className="flex items-center text-blue-400 font-medium">
                    {session.teacher}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Add Form (Right) */}
        <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 p-6 self-start">
          <h2 className="text-lg font-bold text-white mb-6">Quick Assign</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Subject</label>
              <input type="text" className="w-full p-2 border border-gray-700 rounded focus:ring-1 outline-none text-sm" placeholder="e.g. Operating Systems" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Teacher</label>
              <select className="w-full p-2 border border-gray-700 rounded focus:ring-1 outline-none text-sm">
                <option>Select Teacher</option>
                <option>Dr. Sarah Miller</option>
                <option>Prof. John Davis</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Start Time</label>
                <input type="time" className="w-full p-2 border border-gray-700 rounded outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Room</label>
                <input type="text" className="w-full p-2 border border-gray-700 rounded outline-none text-sm" placeholder="e.g. 302" />
              </div>
            </div>
            <button type="button" className="w-full py-2 bg-gray-950 text-white rounded font-medium hover:bg-slate-800 transition-colors mt-2 text-sm">
              Save Schedule
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleClass;
