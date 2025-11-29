import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Chip, CircularProgress, Alert } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { dashboardService } from '../../services/dashboardService';
import { getMaintenanceRequests } from '../../services/maintenanceService';
import type { MaintenanceStats } from '../../services/dashboardService';
import type { MaintenanceRequest } from '../../services/maintenanceService';

export default function MaintenanceDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState<MaintenanceStats | null>(null);
  const [assignedTasks, setAssignedTasks] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch stats
        const data = await dashboardService.getStats();
        if (isMounted) {
          setStats(data.stats as MaintenanceStats);
        }
        
        // Fetch assigned maintenance requests (only IN_PROGRESS ones assigned to current user)
        const requests = await getMaintenanceRequests({ status: 'IN_PROGRESS' });
        
        // Filter to only show requests assigned to the current user
        const userAssignedRequests = requests.filter(
          (req) => req.assignedTo === user?.id
        );
        
        if (isMounted) {
          setAssignedTasks(userAssignedRequests);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load dashboard statistics');
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const statCards = [
    { label: 'Assigned Tasks', value: loading ? '...' : stats?.assignedTasks.toString() || '0', color: '#1976d2' },
    { label: 'Pending Requests', value: loading ? '...' : stats?.pendingRequests.toString() || '0', color: '#d32f2f' },
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'IN_PROGRESS':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Maintenance Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Track and manage your assigned maintenance tasks.
      </Typography>

      {/* Statistics */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, mb: 4 }}>
        {statCards.map((stat) => (
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

      {/* Predictive Maintenance Insights */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Predictive Maintenance Insights (AI Powered)
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, mb: 4 }}>
        {stats?.predictedRisks?.map((risk) => (
          <Card key={risk.id} sx={{ borderLeft: 6, borderColor: risk.riskLevel === 'HIGH' ? 'error.main' : risk.riskLevel === 'MEDIUM' ? 'warning.main' : 'success.main' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {risk.name}
                </Typography>
                <Chip 
                  label={`${risk.riskLevel} RISK`} 
                  color={risk.riskLevel === 'HIGH' ? 'error' : risk.riskLevel === 'MEDIUM' ? 'warning' : 'success'}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>{risk.requestCount}</strong> requests in last 90 days
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
                "{risk.prediction}"
              </Typography>
            </CardContent>
          </Card>
        ))}
        {(!stats?.predictedRisks || stats.predictedRisks.length === 0) && (
          <Card sx={{ gridColumn: '1 / -1' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" align="center">
                No high-risk facilities detected.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Quick Actions */}
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        <Card
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
          }}
          onClick={() => navigate('/maintenance?filter=assigned')}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <AssignmentIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
            <Typography variant="h6">My Tasks</Typography>
            <Typography variant="body2" color="text.secondary">
              View assigned tasks
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
          }}
          onClick={() => navigate('/maintenance?filter=in_progress')}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <BuildIcon sx={{ fontSize: 40, color: '#ed6c02', mb: 1 }} />
            <Typography variant="h6">In Progress</Typography>
            <Typography variant="body2" color="text.secondary">
              Active work items
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
          }}
          onClick={() => navigate('/maintenance?filter=completed')}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <CheckCircleIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 1 }} />
            <Typography variant="h6">Completed</Typography>
            <Typography variant="body2" color="text.secondary">
              View history
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Assigned Tasks */}
      <Typography variant="h6" gutterBottom>
        Your Assigned Tasks
      </Typography>
      {assignedTasks.length === 0 ? (
        <Alert severity="info">No tasks currently assigned. All caught up!</Alert>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {assignedTasks.map((task) => (
            <Card
              key={task.id}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { boxShadow: 3 },
              }}
              onClick={() => navigate('/maintenance')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6">{task.facility.name} - {task.description.substring(0, 50)}...</Typography>
                  <Chip
                    label={task.status.replace('_', ' ')}
                    color={getStatusColor(task.status) as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Location:</strong> {task.facility.location}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Description:</strong> {task.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Created {new Date(task.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
