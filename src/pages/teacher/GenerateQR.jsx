import { useState, useEffect } from 'react';
import { QrCode, StopCircle, RefreshCw, Clock, MapPin, Users } from 'lucide-react';

const GenerateQR = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const endSession = () => { setIsActive(false); setTimeLeft(0); };
  const timerPercent = (timeLeft / 300) * 100;

  const dummyStudents = [
    { id: 1, name: 'Alice Smith', time: '10:01 AM', roll: 'CS001' },
    { id: 2, name: 'Bob Johnson', time: '10:02 AM', roll: 'CS002' },
    { id: 3, name: 'Charlie Davis', time: '10:04 AM', roll: 'CS003' },
    { id: 4, name: 'Diana Wilson', time: '10:05 AM', roll: 'CS004' },
    { id: 5, name: 'Eve Thomas', time: '10:06 AM', roll: 'CS005' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">QR Session — Software Engineering (CS401)</h1>

      {/* Session Info Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center">
          <div className="p-2.5 bg-amber-900/20 rounded-lg mr-3">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500">QR Valid For</p>
            <p className={`text-base font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-amber-400'}`}>{formatTime(timeLeft)}</p>
          </div>
        </div>
        <div className="card bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center">
          <div className="p-2.5 bg-blue-900/20 rounded-lg mr-3">
            <MapPin className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Location Radius</p>
            <p className="text-base font-bold text-blue-400">50 meters</p>
          </div>
        </div>
        <div className="card bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center">
          <div className="p-2.5 bg-green-900/20 rounded-lg mr-3">
            <Users className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Students Present</p>
            <p className="text-base font-bold text-green-400">{dummyStudents.length} / 60</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Display */}
        <div className="lg:col-span-2 card bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center">
          <p className="text-gray-400 mb-6">Scan this code via the Student Dashboard to mark attendance</p>

          <div className={`relative mx-auto w-64 h-64 p-4 rounded-xl border-4 ${isActive ? 'border-blue-500' : 'border-red-500'} flex items-center justify-center bg-gray-800/50 mb-6 transition-colors`}>
            {isActive ? (
              <QrCode className="w-48 h-48 text-gray-200" />
            ) : (
              <div className="text-red-400 font-bold text-xl">QR EXPIRED</div>
            )}
          </div>

          {/* Animated Timer Bar */}
          <div className="w-full max-w-xs mx-auto bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ease-linear ${timeLeft < 60 ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>

          <div className="flex justify-center items-center space-x-4">
            <div className={`text-4xl font-mono font-bold ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </div>
            {isActive ? (
              <button onClick={endSession} className="flex items-center px-5 py-2.5 bg-red-900/30 text-red-400 rounded-lg font-semibold hover:bg-red-900/50 transition-all border border-red-500/20">
                <StopCircle className="w-5 h-5 mr-2" /> Stop Session
              </button>
            ) : (
              <button onClick={() => { setTimeLeft(300); setIsActive(true); }} className="flex items-center px-5 py-2.5 bg-blue-900/30 text-blue-400 rounded-lg font-semibold hover:bg-blue-900/50 transition-all border border-blue-500/20">
                <RefreshCw className="w-5 h-5 mr-2" /> Generate New QR
              </button>
            )}
          </div>
        </div>

        {/* Live Attendee List */}
        <div className="card bg-gray-900 rounded-2xl border border-gray-800 flex flex-col max-h-[600px]">
          <div className="p-5 border-b border-gray-800 flex justify-between items-center">
            <h3 className="font-bold text-white">Live Attendees</h3>
            <span className="bg-green-900/30 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
              {dummyStudents.length} Marked
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-800/50 sticky top-0">
                <tr>
                  <th className="px-4 py-2.5">Student</th>
                  <th className="px-4 py-2.5">Time</th>
                </tr>
              </thead>
              <tbody>
                {dummyStudents.map(student => (
                  <tr key={student.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-white text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.roll}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-green-400 font-medium bg-green-900/20 px-2 py-1 rounded">{student.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateQR;
