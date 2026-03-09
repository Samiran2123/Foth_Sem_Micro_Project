import { useState, useEffect } from 'react';
import { QrCode, StopCircle, RefreshCw } from 'lucide-react';

const GenerateQR = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes standard
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const endSession = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  const dummyStudents = [
    { id: 1, name: 'Alice Smith', time: '10:01 AM', roll: 'CS001' },
    { id: 2, name: 'Bob Johnson', time: '10:02 AM', roll: 'CS002' },
    { id: 3, name: 'Charlie Davis', time: '10:04 AM', roll: 'CS003' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left side: QR Display */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-800 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Software Engineering (CS401)</h2>
          <p className="text-gray-400 mb-8">Scan this code via the Student Dashboard to mark attendance</p>
          
          <div className={`relative mx-auto w-64 h-64 p-4 rounded-xl border-4 ${isActive ? 'border-blue-500' : 'border-red-500'} flex items-center justify-center bg-gray-800/50 mb-8 transition-colors`}>
            {isActive ? (
              <QrCode className="w-48 h-48 text-gray-200" />
            ) : (
              <div className="text-red-400 font-bold text-xl">QR EXPIRED</div>
            )}
            {/* Overlay a scanning line effect */}
            {isActive && <div className="absolute top-0 left-0 w-full h-1 bg-blue-900/200/50 shadow-[0_0_10px_2px_#6366f1] animate-[scan_2s_ease-in-out_infinite]" />}
          </div>

          <div className="flex justify-center items-center space-x-6">
            <div className={`text-4xl font-mono font-bold ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </div>
            {isActive ? (
              <button onClick={endSession} className="flex items-center px-4 py-2 bg-red-900/30 text-red-400 rounded-lg font-medium hover:bg-red-200 transition-colors">
                <StopCircle className="w-5 h-5 mr-2" /> Stop Session
              </button>
            ) : (
              <button onClick={() => { setTimeLeft(300); setIsActive(true); }} className="flex items-center px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg font-medium hover:bg-indigo-200 transition-colors">
                <RefreshCw className="w-5 h-5 mr-2" /> Generate New QR
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Live Attendee List */}
      <div className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800 flex flex-col h-full max-h-[600px]">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-800/50 rounded-t-2xl">
          <h3 className="font-bold text-white">Live Attendees</h3>
          <span className="bg-blue-900/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
            {dummyStudents.length} Marked
          </span>
        </div>
        <div className="p-4 flex-1 overflow-auto">
          {dummyStudents.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Waiting for students...</div>
          ) : (
            <ul className="space-y-3">
              {dummyStudents.map(student => (
                <li key={student.id} className="flex justify-between items-center p-3 hover:bg-gray-800/50 rounded-lg border border-gray-800 transition-colors">
                  <div>
                    <p className="font-semibold text-white text-sm">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.roll}</p>
                  </div>
                  <span className="text-xs text-green-400 font-medium bg-green-900/20 px-2 py-1 rounded">
                    {student.time}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateQR;
