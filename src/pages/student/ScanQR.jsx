import { useState, useEffect } from 'react';
import { Camera, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

const ScanQR = () => {
  const [status, setStatus] = useState('idle'); // idle, scanning, validating, success, error
  
  const simulateScan = () => {
    setStatus('scanning');
    
    // Simulate scan delay
    setTimeout(() => {
      setStatus('validating');
      // Simulate location validation
      setTimeout(() => {
        // Randomly succeed or fail for demo purposes
        const isSuccess = Math.random() > 0.2;
        setStatus(isSuccess ? 'success' : 'error');
      }, 1500);
    }, 2000);
  };

  const resetScanner = () => setStatus('idle');

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">Scan Attendance QR</h1>
        <p className="text-gray-400 mt-2">Make sure you allow camera and location permissions.</p>
      </div>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-800">
        {/* Placeholder Scanner View */}
        <div className="relative bg-gray-950 rounded-xl overflow-hidden aspect-video flex items-center justify-center mb-6">
          {status === 'idle' && (
            <div className="text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <button 
                onClick={simulateScan}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Start Camera
              </button>
            </div>
          )}

          {status === 'scanning' && (
            <div className="text-center">
              <div className="w-48 h-48 border-2 border-blue-500 border-dashed rounded-lg animate-pulse mb-4"></div>
              <p className="text-indigo-400 font-medium">Scanning for QR Code...</p>
            </div>
          )}

          {status === 'validating' && (
            <div className="text-center text-white">
              <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-3 animate-bounce" />
              <p className="font-medium text-blue-200">Validating GPS Location &gt; 50m</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center text-white p-6">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-xl font-bold text-green-400">Attendance Marked!</p>
              <p className="mt-2 text-gray-400">Software Engineering - 10:00 AM</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center text-white p-6">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <p className="text-xl font-bold text-red-400">Verification Failed</p>
              <p className="mt-2 text-gray-400">You are not inside the classroom perimeter (50m).</p>
            </div>
          )}
        </div>

        {/* Action buttons post-scan */}
        {(status === 'success' || status === 'error') && (
          <button 
            onClick={resetScanner}
            className="w-full py-3 bg-gray-800 text-gray-200 rounded-xl font-medium hover:bg-gray-700 transition-colors"
          >
            Scan Another Code
          </button>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
