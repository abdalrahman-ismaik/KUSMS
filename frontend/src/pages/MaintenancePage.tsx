import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import MaintenanceRequestForm from '../components/maintenance/MaintenanceRequestForm';
import MaintenanceRequestList from '../components/maintenance/MaintenanceRequestList';
import StaffRequestQueue from '../components/maintenance/StaffRequestQueue';

const MaintenancePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRequestSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleStatusUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Show staff view for maintenance role
  if (user?.role === 'MAINTENANCE') {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Maintenance Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage and track maintenance requests across all facilities.
        </Typography>

        <StaffRequestQueue refreshTrigger={refreshTrigger} onUpdate={handleStatusUpdated} />
      </Box>
    );
  }

  // Regular user view
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Maintenance Requests
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Report facility issues and track your maintenance requests.
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Submit Request" />
          <Tab label="My Requests" />
        </Tabs>
      </Paper>

      <Box>
        {activeTab === 0 && (
          <MaintenanceRequestForm onRequestSubmitted={handleRequestSubmitted} />
        )}
        {activeTab === 1 && (
          <MaintenanceRequestList refreshTrigger={refreshTrigger} />
        )}
      </Box>
    </Box>
  );
};

export default MaintenancePage;
