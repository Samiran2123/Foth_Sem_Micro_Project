const StudentHistory = () => {
  const historyData = [
    { id: 1, subject: 'Computer Networks', date: '2026-03-10', time: '10:30 AM', status: 'Present' },
    { id: 2, subject: 'Operating Systems', date: '2026-03-09', time: '01:00 PM', status: 'Present' },
    { id: 3, subject: 'Software Engineering', date: '2026-03-08', time: '09:00 AM', status: 'Absent' },
    { id: 4, subject: 'Database Management', date: '2026-03-08', time: '11:15 AM', status: 'Present' },
    { id: 5, subject: 'Computer Networks', date: '2026-03-07', time: '10:30 AM', status: 'Present' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Attendance History</h1>
        <select className="bg-gray-900 border flex-1 max-w-[200px] border-gray-700 text-gray-200 rounded-lg focus:ring-indigo-500 focus:border-blue-500 block p-2.5 outline-none">
          <option>All Subjects</option>
          <option>Computer Networks</option>
          <option>Operating Systems</option>
          <option>Software Engineering</option>
        </select>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-200 uppercase bg-gray-800/50">
              <tr>
                <th scope="col" className="px-6 py-3">Subject</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Time</th>
                <th scope="col" className="px-6 py-3 border-l text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((record) => (
                <tr key={record.id} className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    {record.subject}
                  </td>
                  <td className="px-6 py-4">{record.date}</td>
                  <td className="px-6 py-4">{record.time}</td>
                  <td className="px-6 py-4 border-l text-center">
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === 'Present' 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {record.status}
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

export default StudentHistory;
