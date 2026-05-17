/**
 * App.jsx
 * Main routing with:
 *  - AuthProvider wrapping the whole app
 *  - ProtectedRoute enforcing authentication + role-based access
 *  - New auth pages: Signup, VerifyEmail, ForgotPassword
 *  - Admin /users route for user management
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// ── Shared / Auth pages ──────────────────────────────────────
import Home            from './pages/shared/Home';
import Login           from './pages/shared/Login';
import StudentLogin    from './pages/shared/StudentLogin';
import TeacherLogin    from './pages/shared/TeacherLogin';
import AdminLogin      from './pages/shared/AdminLogin';
import SchedulerLogin  from './pages/shared/SchedulerLogin';
import Signup          from './pages/shared/Signup';
import VerifyEmail     from './pages/shared/VerifyEmail';
import ForgotPassword  from './pages/shared/ForgotPassword';
import PendingApproval from './pages/shared/PendingApproval';

// ── Student pages ────────────────────────────────────────────
import StudentDashboard from './pages/student/StudentDashboard';
import ScanQR           from './pages/student/ScanQR';
import StudentHistory   from './pages/student/StudentHistory';

// ── Teacher pages ────────────────────────────────────────────
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import GenerateQR       from './pages/teacher/GenerateQR';

// ── Admin pages ──────────────────────────────────────────────
import AdminDashboard  from './pages/admin/AdminDashboard';
import ManageUsers     from './pages/admin/ManageUsers';
import ManageTeachers  from './pages/admin/ManageTeachers';
import ScheduleClass   from './pages/admin/ScheduleClass';
import AdminReports    from './pages/admin/AdminReports';

// ── Scheduler pages ──────────────────────────────────────────
import SchedulerDashboard from './pages/scheduler/SchedulerDashboard';
import AddClass           from './pages/scheduler/AddClass';
import ViewSchedule       from './pages/scheduler/ViewSchedule';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Public / Auth routes ── */}
          <Route element={<AuthLayout />}>
            <Route path="/"                      element={<Home />} />
            <Route path="/login"                 element={<Login />} />
            <Route path="/login/student"         element={<StudentLogin />} />
            <Route path="/login/teacher"         element={<TeacherLogin />} />
            <Route path="/login/admin"           element={<AdminLogin />} />
            <Route path="/login/scheduler"       element={<SchedulerLogin />} />
            <Route path="/signup/:role"          element={<Signup />} />
            <Route path="/verify-email"          element={<VerifyEmail />} />
            <Route path="/forgot-password"       element={<ForgotPassword />} />
          </Route>

          {/* Pending approval – full-page (no auth required) */}
          <Route path="/pending-approval" element={<PendingApproval />} />

          {/* ── Student routes (protected) ── */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student" element={<DashboardLayout role="student" />}>
              <Route index                       element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"            element={<StudentDashboard />} />
              <Route path="scan"                 element={<ScanQR />} />
              <Route path="history"              element={<StudentHistory />} />
            </Route>
          </Route>

          {/* ── Teacher routes (protected) ── */}
          <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
            <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
              <Route index                       element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"            element={<TeacherDashboard />} />
              <Route path="qr-generate"          element={<GenerateQR />} />
            </Route>
          </Route>

          {/* ── Admin routes (protected) ── */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<DashboardLayout role="admin" />}>
              <Route index                       element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"            element={<AdminDashboard />} />
              <Route path="users"                element={<ManageUsers />} />
              <Route path="teachers"             element={<ManageTeachers />} />
              <Route path="schedule"             element={<ScheduleClass />} />
              <Route path="reports"              element={<AdminReports />} />
            </Route>
          </Route>

          {/* ── Scheduler routes (protected) ── */}
          <Route element={<ProtectedRoute allowedRoles={['scheduler']} />}>
            <Route path="/scheduler" element={<DashboardLayout role="scheduler" />}>
              <Route index                       element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"            element={<SchedulerDashboard />} />
              <Route path="add-class"            element={<AddClass />} />
              <Route path="view-schedule"        element={<ViewSchedule />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
