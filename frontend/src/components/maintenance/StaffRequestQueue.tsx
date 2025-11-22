import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  getMaintenanceRequests,
  updateMaintenanceStatus,
} from '../../services/maintenanceService';
import type { MaintenanceRequest } from '../../services/maintenanceService';

interface StaffRequestQueueProps {
  refreshTrigger: number;
  onUpdate: () => void;
}

const StaffRequestQueue: React.FC<StaffRequestQueueProps> = ({
  refreshTrigger,
  onUpdate,
}) => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: 'PENDING' as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
    notes: '',
  });
  const [updating, setUpdating] = useState(false);

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

  const handleUpdateClick = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setUpdateData({
      status: request.status,
      notes: request.notes || '',
    });
    setShowUpdateDialog(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedRequest) return;

    setUpdating(true);
    try {
      await updateMaintenanceStatus(selectedRequest.id, updateData);
      setShowUpdateDialog(false);
      setSelectedRequest(null);
      fetchRequests();
      onUpdate();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update status');
    } finally {
      setUpdating(false);
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

  const filterRequestsByStatus = (status?: string) => {
    if (!status) return requests;
    return requests.filter((r) => r.status === status);
  };

  const getFilteredRequests = () => {
    switch (activeTab) {
      case 0:
        return requests; // All
      case 1:
        return filterRequestsByStatus('PENDING');
      case 2:
        return filterRequestsByStatus('IN_PROGRESS');
      case 3:
        return filterRequestsByStatus('COMPLETED');
      default:
        return requests;
    }
  };

  const filteredRequests = getFilteredRequests();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label={`All (${requests.length})`} />
        <Tab label={`Pending (${filterRequestsByStatus('PENDING').length})`} />
        <Tab label={`In Progress (${filterRequestsByStatus('IN_PROGRESS').length})`} />
        <Tab label={`Completed (${filterRequestsByStatus('COMPLETED').length})`} />
      </Tabs>

      {filteredRequests.length === 0 ? (
        <Alert severity="info">No requests in this category.</Alert>
      ) : (
        <Grid container spacing={2}>
          {filteredRequests.map((request) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={request.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="div">
                      {request.facility.name}
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
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

                  <Box mb={2}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Location:</strong> {request.facility.location}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Reported by:</strong> {request.reportedBy.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      <strong>Submitted:</strong>{' '}
                      {new Date(request.createdAt).toLocaleString()}
                    </Typography>
                    {request.notes && (
                      <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                        <strong>Notes:</strong> {request.notes}
                      </Typography>
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    onClick={() => handleUpdateClick(request)}
                  >
                    Update Status
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Update Status Dialog */}
      <Dialog open={showUpdateDialog} onClose={() => setShowUpdateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Maintenance Request</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Facility:</strong> {selectedRequest.facility.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <strong>Description:</strong> {selectedRequest.description}
              </Typography>

              <TextField
                select
                fullWidth
                label="Status"
                value={updateData.status}
                onChange={(e) =>
                  setUpdateData({ ...updateData, status: e.target.value as any })
                }
                sx={{ mb: 2 }}
              >
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={updateData.notes}
                onChange={(e) => setUpdateData({ ...updateData, notes: e.target.value })}
                placeholder="Add notes about the work performed..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpdateDialog(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateSubmit}
            variant="contained"
            disabled={updating}
            startIcon={updating && <CircularProgress size={20} />}
          >
            {updating ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffRequestQueue;
