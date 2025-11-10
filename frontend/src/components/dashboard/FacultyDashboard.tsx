import { Box, Card, CardContent, Typography } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import BuildIcon from '@mui/icons-material/Build';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';

export default function FacultyDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Book a Facility',
      description: 'Reserve classrooms, labs, or meeting rooms',
      icon: <BookIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      path: '/bookings',
    },
    {
      title: 'Create Event',
      description: 'Schedule university events and activities',
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      path: '/events',
    },
    {
      title: 'Report Issue',
      description: 'Submit maintenance requests',
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
      path: '/maintenance',
    },
    {
      title: 'Manage Students',
      description: 'View student bookings and requests',
      icon: <PersonAddIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      path: '/students',
    },
    {
      title: 'Schedule Overview',
      description: 'View your facility reservations',
      icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
      color: '#0288d1',
      path: '/schedule',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Faculty Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your bookings, events, and student requests.
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

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              No recent activity to display. Your bookings and events will appear here.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
