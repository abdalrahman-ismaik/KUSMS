import { useAuth } from '../hooks/useAuth';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import FacultyDashboard from '../components/dashboard/FacultyDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import MaintenanceDashboard from '../components/dashboard/MaintenanceDashboard';
import { Box, Typography } from '@mui/material';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  // Render role-specific dashboard
  switch (user.role) {
    case 'STUDENT':
      return <StudentDashboard />;
    case 'FACULTY':
      return <FacultyDashboard />;
    case 'ADMIN':
      return <AdminDashboard />;
    case 'MAINTENANCE':
      return <MaintenanceDashboard />;
    default:
      return (
        <Box>
          <Typography variant="h4">Dashboard</Typography>
          <Typography>Welcome to KUSMS!</Typography>
        </Box>
      );
  }
}
