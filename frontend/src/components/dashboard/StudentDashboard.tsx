import { Box, Card, CardContent, Typography, Grid, Button, Chip } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import StatCard from '../common/StatCard';

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
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ 
          fontWeight: 700,
          fontSize: '1.875rem',
          lineHeight: 1.2,
          mb: 1
        }}>
          Student Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
          Welcome back! Here's an overview of your activity.
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Bookings"
            value="3"
            icon={<BookIcon sx={{ fontSize: 28 }} />}
            color="primary"
            subtitle="Upcoming reservations"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Requests"
            value="1"
            icon={<PendingIcon sx={{ fontSize: 28 }} />}
            color="warning"
            subtitle="Awaiting approval"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming Events"
            value="5"
            icon={<CalendarTodayIcon sx={{ fontSize: 28 }} />}
            color="info"
            subtitle="This week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value="12"
            icon={<CheckCircleIcon sx={{ fontSize: 28 }} />}
            color="success"
            subtitle="This semester"
            trend={{ value: 20, isPositive: true }}
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" gutterBottom sx={{ 
          fontWeight: 600,
          mb: 3,
          fontSize: '1.125rem',
          lineHeight: 1.4
        }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action) => (
            <Grid item xs={12} sm={6} md={4} key={action.title}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    bgcolor: action.color,
                  }
                }}
                onClick={() => navigate(action.path)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      bgcolor: `${action.color}15`,
                      color: action.color,
                      display: 'flex'
                    }}>
                      {action.icon}
                    </Box>
                    <ArrowForwardIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recent Activity */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.4
          }}>
            Recent Activity
          </Typography>
          <Button 
            size="small" 
            endIcon={<ArrowForwardIcon sx={{ fontSize: '1rem' }} />}
            sx={{ fontWeight: 600, fontSize: '0.875rem' }}
          >
            View All
          </Button>
        </Box>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#0f172a', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'primary.main', color: 'white' }}>
                    <BookIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Room B101 Booking
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Nov 20, 2025 • 2:00 PM - 4:00 PM
                    </Typography>
                  </Box>
                </Box>
                <Chip label="Approved" color="success" size="small" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#0f172a', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'warning.main', color: 'white' }}>
                    <PendingIcon />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Lab C302 Request
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Nov 22, 2025 • 10:00 AM - 12:00 PM
                    </Typography>
                  </Box>
                </Box>
                <Chip label="Pending" color="warning" size="small" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
