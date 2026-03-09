import { Link } from 'react-router-dom';
import { QrCode, MonitorSmartphone, ShieldCheck, ScanLine, MapPin, Database, ArrowRight } from 'lucide-react';

const Home = () => {
  const howItWorks = [
    { step: 1, title: 'Teacher Generates QR', desc: 'Teacher starts a class session and a dynamic QR code is generated with a time limit.', icon: QrCode, color: 'from-blue-600 to-blue-400' },
    { step: 2, title: 'Student Scans QR', desc: 'Students open the app and scan the projected QR code using their device camera.', icon: ScanLine, color: 'from-red-600 to-red-400' },
    { step: 3, title: 'Location Verified', desc: 'System verifies the student is within 50 meters of the classroom using GPS.', icon: MapPin, color: 'from-amber-600 to-amber-400' },
    { step: 4, title: 'Attendance Stored', desc: 'Once verified, attendance is securely recorded and visible to teachers and admin.', icon: Database, color: 'from-green-600 to-green-400' },
  ];

  return (
    <div className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
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
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-20">
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

      {/* How It Works */}
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">How It <span className="text-blue-400">Works</span></h2>
          <p className="mt-3 text-gray-400">Four simple steps to secure, location-verified attendance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="card bg-gray-900 border border-gray-800 rounded-xl p-6 text-center relative group">
                {/* Step number badge */}
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                  {item.step}
                </div>
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 mt-3 shadow-md`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
