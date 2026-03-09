import { Plus, Edit2, Trash2 } from 'lucide-react';

const ManageTeachers = () => {
  const teachers = [
    { id: 'T001', name: 'Dr. Sarah Miller', department: 'Computer Science', email: 'sarah.m@college.edu', status: 'Active' },
    { id: 'T002', name: 'Prof. John Davis', department: 'Mathematics', email: 'john.d@college.edu', status: 'Active' },
    { id: 'T003', name: 'Dr. Emily Chen', department: 'Physics', email: 'emily.c@college.edu', status: 'On Leave' },
    { id: 'T004', name: 'Dr. Michael Brown', department: 'Computer Science', email: 'michael.b@college.edu', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Manage Teachers</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-4 h-4 mr-2" /> Add New Teacher
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
          <input 
            type="text" 
            placeholder="Search teachers..." 
            className="p-2 border border-gray-700 rounded-lg text-sm w-64 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
          <select className="p-2 border border-gray-700 rounded-lg text-sm outline-none">
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Mathematics</option>
            <option>Physics</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-200 uppercase bg-gray-800/50 border-b border-gray-800">
              <tr>
                <th className="px-6 py-3">Teacher ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-white">{t.id}</td>
                  <td className="px-6 py-4">{t.name}</td>
                  <td className="px-6 py-4">{t.department}</td>
                  <td className="px-6 py-4 text-blue-400 cursor-pointer">{t.email}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      t.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/20 text-amber-400'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-400 hover:text-blue-800 mr-3 inline-flex border border-blue-800 p-1 rounded-md hover:bg-blue-900/20">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 inline-flex border border-red-800 p-1 rounded-md hover:bg-red-900/20">
                      <Trash2 className="w-4 h-4" />
                    </button>
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

export default ManageTeachers;
