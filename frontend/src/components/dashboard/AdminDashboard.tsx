import { Box, Card, CardContent, Typography, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DomainIcon from '@mui/icons-material/Domain';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import EventIcon from '@mui/icons-material/Event';
import BuildIcon from '@mui/icons-material/Build';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import StatCard from '../common/StatCard';

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

  const pendingApprovals = [
    { id: 1, user: 'John Smith', type: 'Booking', facility: 'Room B101', date: 'Nov 20, 2025', time: '2:00 PM' },
    { id: 2, user: 'Sarah Johnson', type: 'Event', facility: 'Auditorium', date: 'Nov 22, 2025', time: '10:00 AM' },
    { id: 3, user: 'Mike Davis', type: 'Booking', facility: 'Lab C302', date: 'Nov 21, 2025', time: '3:00 PM' },
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
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
          System overview and administrative controls.
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Users"
            value="248"
            icon={<PeopleIcon sx={{ fontSize: 28 }} />}
            color="primary"
            subtitle="Active accounts"
            trend={{ value: 12, isPositive: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Approvals"
            value="8"
            icon={<PendingIcon sx={{ fontSize: 28 }} />}
            color="warning"
            subtitle="Requires action"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Bookings"
            value="42"
            icon={<EventIcon sx={{ fontSize: 28 }} />}
            color="info"
            subtitle="This week"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Facilities"
            value="15"
            icon={<DomainIcon sx={{ fontSize: 28 }} />}
            color="success"
            subtitle="Available resources"
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
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={action.title}>
              <Card
                sx={{
                  cursor: 'pointer',
                  height: '100%',
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
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Box sx={{ 
                    display: 'inline-flex',
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: `${action.color}15`,
                    color: action.color,
                    mb: 1
                  }}>
                    {action.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    {action.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pending Approvals Table */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.4
          }}>
            Pending Approvals
          </Typography>
          <Button 
            size="small" 
            endIcon={<ArrowForwardIcon sx={{ fontSize: '1rem' }} />} 
            onClick={() => navigate('/approvals')}
            sx={{ fontWeight: 600, fontSize: '0.875rem' }}
          >
            View All
          </Button>
        </Box>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Facility</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingApprovals.map((approval) => (
                  <TableRow key={approval.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {approval.user}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={approval.type} 
                        size="small" 
                        color={approval.type === 'Booking' ? 'primary' : 'secondary'}
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{approval.facility}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{approval.date}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {approval.time}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label="Pending" size="small" color="warning" />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" color="success" sx={{ mr: 1 }}>
                        Approve
                      </Button>
                      <Button size="small" variant="outlined" color="error">
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Box>
  );
}
