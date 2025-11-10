import { Box, Card, CardContent, Typography } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import BuildIcon from '@mui/icons-material/Build';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Book a Facility',
      description: 'Reserve classrooms, labs, or sports facilities',
      icon: <BookIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      path: '/bookings',
    },
    {
      title: 'View Events',
      description: 'Check upcoming university events and deadlines',
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      path: '/events',
    },
    {
      title: 'Report Issue',
      description: 'Submit maintenance requests for facilities',
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
      path: '/maintenance',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome! Here's your quick access to KUSMS features.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mt: 2 }}>
        {quickActions.map((action) => (
          <Box key={action.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                <Box sx={{ color: action.color, mb: 2 }}>
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
              No recent bookings or requests. Get started by booking a facility or checking upcoming events!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
