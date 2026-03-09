import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CalendarCheck, Clock, MapPin, User } from 'lucide-react';

const AddClass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/scheduler/dashboard');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Plus className="w-6 h-6 mr-2 text-amber-400" />
          Add New Class
        </h1>
        <p className="text-gray-400 text-sm mt-1">Schedule a new class session for a subject and assign a teacher</p>
      </div>

      <div className="card bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject Details */}
          <div className="border-b border-gray-800 pb-6">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">Subject Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject Name</label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineering"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject Code</label>
                <input
                  type="text"
                  placeholder="e.g. CS401"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Teacher & Department */}
          <div className="border-b border-gray-800 pb-6">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center">
              <User className="w-4 h-4 mr-2" /> Assign Teacher
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Teacher</label>
                <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all">
                  <option>Dr. Sarah Miller</option>
                  <option>Prof. John Davis</option>
                  <option>Dr. Emily Chen</option>
                  <option>Dr. Michael Brown</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Department</label>
                <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all">
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Electronics</option>
                </select>
              </div>
            </div>
          </div>

          {/* Timing */}
          <div className="border-b border-gray-800 pb-6">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2" /> Schedule & Timing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Days</label>
                <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all">
                  <option>Mon, Wed, Fri</option>
                  <option>Tue, Thu</option>
                  <option>Mon - Fri</option>
                  <option>Saturday Only</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Start Time</label>
                <input
                  type="time"
                  defaultValue="10:00"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">End Time</label>
                <input
                  type="time"
                  defaultValue="11:30"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="pb-2">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2" /> Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Room / Lab</label>
                <input
                  type="text"
                  placeholder="e.g. Room 301 or Lab 4"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Building</label>
                <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all">
                  <option>Main Block</option>
                  <option>Science Block</option>
                  <option>IT Block</option>
                  <option>Library Hall</option>
                </select>
              </div>
            </div>
          </div>

          {/* Semester & Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Semester</label>
              <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all">
                <option>1st Semester</option>
                <option>2nd Semester</option>
                <option>3rd Semester</option>
                <option>4th Semester</option>
                <option>5th Semester</option>
                <option>6th Semester</option>
                <option>7th Semester</option>
                <option>8th Semester</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Section</label>
              <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all">
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all text-base ${
              loading ? 'bg-amber-800' : 'bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-600/20'
            }`}
          >
            {loading ? 'Scheduling Class...' : 'Schedule This Class'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
