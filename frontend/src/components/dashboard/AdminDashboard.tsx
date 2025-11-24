import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, CircularProgress, Alert } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DomainIcon from '@mui/icons-material/Domain';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import StatCard from '../common/StatCard';
import { dashboardService } from '../../services/dashboardService';
import type { AdminStats } from '../../services/dashboardService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { stats } = await dashboardService.getStats();
        setStats(stats as AdminStats);
      } catch (err) {
        setError('Failed to load dashboard statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
            value={loading ? "..." : stats?.totalUsers.toString() || "0"}
            icon={<PeopleIcon sx={{ fontSize: 28 }} />}
            color="primary"
            subtitle="Active accounts"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pending Approvals"
            value={loading ? "..." : stats?.pendingApprovals.toString() || "0"}
            icon={<PendingIcon sx={{ fontSize: 28 }} />}
            color="warning"
            subtitle="Requires action"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Bookings"
            value={loading ? "..." : stats?.activeBookings.toString() || "0"}
            icon={<EventIcon sx={{ fontSize: 28 }} />}
            color="info"
            subtitle="This week"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Facilities"
            value={loading ? "..." : stats?.totalFacilities.toString() || "0"}
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

      {/* Space Utilization Insights */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" gutterBottom sx={{ 
          fontWeight: 600,
          mb: 3,
          fontSize: '1.125rem',
          lineHeight: 1.4
        }}>
          Space Utilization Insights (AI Powered)
        </Typography>
        <Grid container spacing={2}>
          {stats?.utilization?.map((item) => (
            <Grid size={{ xs: 12, md: 6 }} key={item.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Chip 
                      label={`${item.percentage}% Usage`} 
                      color={item.percentage > 80 ? 'error' : item.percentage < 20 ? 'warning' : 'success'}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 8, mb: 2 }}>
                    <Box sx={{ 
                      width: `${item.percentage}%`, 
                      bgcolor: item.percentage > 80 ? 'error.main' : item.percentage < 20 ? 'warning.main' : 'success.main',
                      height: '100%', 
                      borderRadius: 1 
                    }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Insight:</strong> {item.insight}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {(!stats?.utilization || stats.utilization.length === 0) && (
             <Grid size={{ xs: 12 }}>
               <Card>
                 <CardContent>
                   <Typography variant="body2" color="text.secondary" align="center">
                     No utilization data available yet.
                   </Typography>
                 </CardContent>
               </Card>
             </Grid>
          )}
        </Grid>
      </Box>

      {/* Recent Activity Table */}
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
                  <TableCell>Activity</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats?.recentActivity.map((activity) => (
                  <TableRow key={activity.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {activity.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={activity.type} 
                        size="small" 
                        color={activity.type === 'BOOKING' ? 'primary' : 'secondary'}
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(activity.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(activity.date).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={activity.status} 
                        size="small" 
                        color={
                          activity.status === 'PENDING' ? 'warning' : 
                          activity.status === 'APPROVED' ? 'success' : 'error'
                        } 
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                        No recent activity found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Box>
  );
}
