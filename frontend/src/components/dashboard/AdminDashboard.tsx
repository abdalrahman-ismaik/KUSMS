import { Box, Card, CardContent, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DomainIcon from '@mui/icons-material/Domain';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      path: '/users',
    },
    {
      title: 'Manage Facilities',
      description: 'Add, edit, or remove facilities',
      icon: <DomainIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      path: '/facilities',
    },
    {
      title: 'Pending Approvals',
      description: 'Review and approve booking requests',
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
      path: '/approvals',
    },
    {
      title: 'Maintenance Requests',
      description: 'Assign and track maintenance tasks',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: '#d32f2f',
      path: '/maintenance',
    },
    {
      title: 'Analytics',
      description: 'View usage statistics and reports',
      icon: <BarChartIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      path: '/analytics',
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: <SettingsIcon sx={{ fontSize: 40 }} />,
      color: '#455a64',
      path: '/settings',
    },
  ];

  const stats = [
    { label: 'Total Users', value: '248', color: '#1976d2' },
    { label: 'Active Bookings', value: '42', color: '#2e7d32' },
    { label: 'Pending Approvals', value: '8', color: '#ed6c02' },
    { label: 'Facilities', value: '15', color: '#9c27b0' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        System overview and administrative controls.
      </Typography>

      {/* Statistics */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {stat.label}
              </Typography>
              <Typography variant="h4" sx={{ color: stat.color }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Quick Actions */}
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mt: 2 }}>
        {quickActions.map((action) => (
          <Box key={action.title}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
                height: '100%',
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    bgcolor: `${action.color}20`,
                    color: action.color,
                    mb: 2,
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
