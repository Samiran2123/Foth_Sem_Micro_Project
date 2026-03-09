import { CalendarCheck, Clock, MapPin, Edit2, Trash2 } from 'lucide-react';

const ViewSchedule = () => {
  const allClasses = [
    { id: 1, subject: 'Software Engineering', code: 'CS401', teacher: 'Dr. Sarah Miller', days: 'Mon, Wed, Fri', time: '10:00 - 11:30 AM', room: 'Room 301', semester: '4th', section: 'A' },
    { id: 2, subject: 'Database Systems', code: 'CS302', teacher: 'Dr. Michael Brown', days: 'Tue, Thu', time: '12:00 - 01:30 PM', room: 'Lab 4', semester: '4th', section: 'A' },
    { id: 3, subject: 'Computer Networks', code: 'CS405', teacher: 'Dr. Sarah Miller', days: 'Wed, Fri', time: '02:00 - 03:30 PM', room: 'Room 305', semester: '4th', section: 'B' },
    { id: 4, subject: 'Mathematics IV', code: 'MA401', teacher: 'Prof. John Davis', days: 'Mon, Wed', time: '09:00 - 10:00 AM', room: 'Room 102', semester: '4th', section: 'A' },
    { id: 5, subject: 'Operating Systems', code: 'CS303', teacher: 'Dr. Emily Chen', days: 'Tue, Thu', time: '03:00 - 04:30 PM', room: 'Room 201', semester: '3rd', section: 'A' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <CalendarCheck className="w-6 h-6 mr-2 text-amber-400" />
            All Scheduled Classes
          </h1>
          <p className="text-gray-400 text-sm mt-1">{allClasses.length} classes currently scheduled</p>
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:ring-1 focus:ring-amber-500">
            <option>All Semesters</option>
            <option>3rd Semester</option>
            <option>4th Semester</option>
          </select>
          <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:ring-1 focus:ring-amber-500">
            <option>All Sections</option>
            <option>Section A</option>
            <option>Section B</option>
          </select>
        </div>
      </div>

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allClasses.map((cls) => (
          <div key={cls.id} className="card bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-amber-500/30 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-base font-bold text-white">{cls.subject}</h3>
                <p className="text-xs text-amber-400 font-medium">{cls.code}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-gray-500 hover:text-blue-400 border border-gray-700 rounded-md hover:border-blue-500/30 transition-all">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 text-gray-500 hover:text-red-400 border border-gray-700 rounded-md hover:border-red-500/30 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <span className="text-gray-500 w-20">Teacher:</span>
                <span>{cls.teacher}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                <span className="text-gray-500 mr-1">{cls.days}</span>
                <span className="text-amber-400/80">{cls.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                <span>{cls.room}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-900/20 text-blue-400 rounded">{cls.semester} Sem</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-gray-800 text-gray-400 rounded">{cls.section}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSchedule;
