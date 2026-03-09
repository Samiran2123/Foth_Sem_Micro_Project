import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Shield, CalendarCheck } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Scan QR & view attendance',
      icon: User,
      path: '/login/student',
      accent: 'border-blue-500/30 hover:border-blue-400',
      iconBg: 'bg-blue-900/30 text-blue-400',
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Generate QR & manage sessions',
      icon: GraduationCap,
      path: '/login/teacher',
      accent: 'border-red-500/30 hover:border-red-400',
      iconBg: 'bg-red-900/30 text-red-400',
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'System overview & reports',
      icon: Shield,
      path: '/login/admin',
      accent: 'border-green-500/30 hover:border-green-400',
      iconBg: 'bg-green-900/30 text-green-400',
    },
    {
      id: 'scheduler',
      title: 'Class Scheduler',
      description: 'Schedule & organize classes',
      icon: CalendarCheck,
      path: '/login/admin',
      accent: 'border-amber-500/30 hover:border-amber-400',
      iconBg: 'bg-amber-900/30 text-amber-400',
    }
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-white mb-6 text-center">Select your role to continue</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => navigate(role.path)}
              className={`flex flex-col items-center p-5 bg-gray-800/50 border rounded-xl transition-all duration-300 cursor-pointer hover:shadow-lg text-center ${role.accent}`}
            >
              <div className={`p-3 rounded-lg mb-3 ${role.iconBg}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">{role.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{role.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Login;
