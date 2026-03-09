import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-blue-500">Smart</span> <span className="text-red-500">Attendance</span>
          </h1>
          <p className="text-gray-400">QR Code Based System</p>
        </div>
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
          <Outlet />
        </div>
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
