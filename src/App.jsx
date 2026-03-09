import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/shared/Home';
import Login from './pages/shared/Login';
import StudentLogin from './pages/shared/StudentLogin';
import TeacherLogin from './pages/shared/TeacherLogin';
import AdminLogin from './pages/shared/AdminLogin';
import SchedulerLogin from './pages/shared/SchedulerLogin';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import ScanQR from './pages/student/ScanQR';
import StudentHistory from './pages/student/StudentHistory';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import GenerateQR from './pages/teacher/GenerateQR';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageTeachers from './pages/admin/ManageTeachers';
import ScheduleClass from './pages/admin/ScheduleClass';
import AdminReports from './pages/admin/AdminReports';

// Scheduler Pages
import SchedulerDashboard from './pages/scheduler/SchedulerDashboard';
import AddClass from './pages/scheduler/AddClass';
import ViewSchedule from './pages/scheduler/ViewSchedule';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth / Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/teacher" element={<TeacherLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/scheduler" element={<SchedulerLogin />} />
        </Route>

        {/* Student routes */}
        <Route path="/student" element={<DashboardLayout role="student" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="scan" element={<ScanQR />} />
          <Route path="history" element={<StudentHistory />} />
        </Route>

        {/* Teacher routes — no more Create Class */}
        <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="qr-generate" element={<GenerateQR />} />
        </Route>

        {/* Admin routes — includes class scheduling */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="schedule" element={<ScheduleClass />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        {/* Scheduler routes — dedicated class scheduling portal */}
        <Route path="/scheduler" element={<DashboardLayout role="scheduler" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SchedulerDashboard />} />
          <Route path="add-class" element={<AddClass />} />
          <Route path="view-schedule" element={<ViewSchedule />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
