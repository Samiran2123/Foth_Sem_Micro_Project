import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const CreateClass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Dummy simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/teacher/qr-generate');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Create New Class Session</h1>
      
      <div className="bg-gray-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Subject / Course</label>
            <select className="w-full p-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 outline-none">
              <option>Software Engineering (CS401)</option>
              <option>Database Systems (CS302)</option>
              <option>Computer Networks (CS405)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">QR Code Expiry Time (minutes)</label>
              <input 
                type="number" 
                defaultValue="5" 
                min="1"
                max="15"
                className="w-full p-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Class Type</label>
              <select className="w-full p-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-blue-500 outline-none">
                <option>Lecture</option>
                <option>Lab</option>
                <option>Examination</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-800">
            <h3 className="text-sm font-bold text-white flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-2 text-blue-400" />
              Location Validation
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              The system will record your current GPS coordinates. Students must be within 50 meters of this location to mark attendance successfully.
            </p>
            <div className="flex space-x-4 text-sm font-mono text-gray-300 bg-gray-900 p-2 rounded border border-gray-800 inline-flex">
              <span>Lat: 28.6139</span>
              <span>Long: 77.2090</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${
              loading ? 'bg-indigo-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Creating Session...' : 'Generate Dynamic QR & Start Class'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
