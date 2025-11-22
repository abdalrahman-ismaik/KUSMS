import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { getMaintenanceRequests } from '../../services/maintenanceService';
import type { MaintenanceRequest } from '../../services/maintenanceService';

interface MaintenanceRequestListProps {
  refreshTrigger: number;
}

const MaintenanceRequestList: React.FC<MaintenanceRequestListProps> = ({
  refreshTrigger,
}) => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, [refreshTrigger]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getMaintenanceRequests();
      setRequests(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'error';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'success';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" onClose={() => setError('')}>
        {error}
      </Alert>
    );
  }

  if (requests.length === 0) {
    return (
      <Alert severity="info">
        No maintenance requests found. Submit your first request using the form above.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Maintenance Requests ({requests.length})
      </Typography>

      <Grid container spacing={2}>
        {requests.map((request) => (
          <Grid size={{ xs: 12, md: 6 }} key={request.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="div">
                    {request.facility.name}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Chip
                      label={request.status.replace('_', ' ')}
                      color={getStatusColor(request.status) as any}
                      size="small"
                    />
                    <Chip
                      label={request.priority}
                      color={getPriorityColor(request.priority) as any}
                      size="small"
                    />
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {request.description}
                </Typography>

                <Box mt={2}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    <strong>Location:</strong> {request.facility.location}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    <strong>Submitted:</strong>{' '}
                    {new Date(request.createdAt).toLocaleString()}
                  </Typography>
                  {request.assignedTo && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Assigned to:</strong> {request.assignedTo.name}
                    </Typography>
                  )}
                  {request.completedAt && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Completed:</strong>{' '}
                      {new Date(request.completedAt).toLocaleString()}
                    </Typography>
                  )}
                  {request.notes && (
                    <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                      <strong>Notes:</strong> {request.notes}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MaintenanceRequestList;
