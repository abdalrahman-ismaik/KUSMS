import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import PendingBookingsList from '../components/booking/PendingBookingsList';
import PendingEventsList from '../components/events/PendingEventsList';
import FacilityList from '../components/facilities/FacilityList';
import UserList from '../components/users/UserList';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage booking approvals, event proposals, facilities, and users.
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Pending Bookings" />
          <Tab label="Pending Events" />
          <Tab label="All Bookings" />
          <Tab label="Facilities" />
          <Tab label="Users" />
        </Tabs>
      </Paper>

      <Box>
        {activeTab === 0 && <PendingBookingsList refreshTrigger={refreshTrigger} />}
        {activeTab === 1 && <PendingEventsList onUpdate={handleUpdate} />}
        {activeTab === 2 && (
          <Typography variant="body2" color="text.secondary">
            All bookings view coming soon...
          </Typography>
        )}
        {activeTab === 3 && <FacilityList />}
        {activeTab === 4 && <UserList />}
      </Box>
    </Box>
  );
}
