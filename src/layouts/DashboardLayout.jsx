import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Home, QrCode, ClipboardList, BookOpen, Users, Calendar, CalendarCheck, Plus, Menu, X } from 'lucide-react';

const DashboardLayout = ({ role }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const getLinks = () => {
    switch (role) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/student/dashboard', icon: Home },
          { name: 'Scan QR', path: '/student/scan', icon: QrCode },
          { name: 'History', path: '/student/history', icon: ClipboardList },
        ];
      case 'teacher':
        return [
          { name: 'Dashboard', path: '/teacher/dashboard', icon: Home },
          { name: 'Generate QR', path: '/teacher/qr-generate', icon: QrCode },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
          { name: 'Teachers', path: '/admin/teachers', icon: Users },
          { name: 'Schedule', path: '/admin/schedule', icon: Calendar },
          { name: 'Reports', path: '/admin/reports', icon: ClipboardList },
        ];
      case 'scheduler':
        return [
          { name: 'Dashboard', path: '/scheduler/dashboard', icon: Home },
          { name: 'Add Class', path: '/scheduler/add-class', icon: Plus },
          { name: 'View Schedule', path: '/scheduler/view-schedule', icon: CalendarCheck },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gray-900 border-r border-gray-800 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">
            <span className="text-blue-500">Smart</span><span className="text-red-500">Attend</span>
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Animated gradient bar */}
        <div className="h-0.5 animated-gradient" />

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-900/20'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-400 rounded-lg hover:bg-red-900/30 hover:text-red-400 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
          {/* Mobile menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>

          <h2 className="text-lg font-bold text-white capitalize">
            <span className="text-blue-400">{role}</span> Portal
          </h2>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg">
              {role.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
