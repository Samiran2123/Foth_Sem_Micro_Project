import { Link } from 'react-router-dom';
import { QrCode, MonitorSmartphone, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-red-500 rounded-2xl flex items-center justify-center shadow-lg glow-blue">
            <QrCode className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          Smart <span className="text-blue-400">Attendance</span> <span className="text-red-400">System</span>
        </h2>
        <p className="mt-4 text-lg text-gray-400 leading-relaxed">
          A seamless, QR-code based attendance tracking platform designed for modern college environments. Fast, secure, and location-aware.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-xl text-red-400 border border-red-500/40 hover:bg-red-900/20 transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="card bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
          <div className="h-12 w-12 bg-blue-900/30 text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MonitorSmartphone className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Easy Scanning</h3>
          <p className="text-gray-400 text-sm">Students simply scan the QR code projected in class to mark their attendance in seconds.</p>
        </div>
        
        <div className="card bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
          <div className="h-12 w-12 bg-green-900/20 text-green-400 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Location Verified</h3>
          <p className="text-gray-400 text-sm">Validates student location to ensure they are actually present in the classroom.</p>
        </div>

        <div className="card bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
          <div className="h-12 w-12 bg-red-900/20 text-red-400 rounded-lg flex items-center justify-center mx-auto mb-4">
            <QrCode className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Dynamic Codes</h3>
          <p className="text-gray-400 text-sm">QR codes change dynamically and expire quickly to prevent proxy attendance.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
