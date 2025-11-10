import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import PendingBookingsList from '../components/booking/PendingBookingsList';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshTrigger] = useState(0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage booking approvals, facilities, users, and system settings.
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Pending Bookings" />
          <Tab label="All Bookings" />
          <Tab label="Facilities" />
          <Tab label="Users" />
        </Tabs>
      </Paper>

      <Box>
        {activeTab === 0 && <PendingBookingsList refreshTrigger={refreshTrigger} />}
        {activeTab === 1 && (
          <Typography variant="body2" color="text.secondary">
            All bookings view coming soon...
          </Typography>
        )}
        {activeTab === 2 && (
          <Typography variant="body2" color="text.secondary">
            Facility management coming soon...
          </Typography>
        )}
        {activeTab === 3 && (
          <Typography variant="body2" color="text.secondary">
            User management coming soon...
          </Typography>
        )}
      </Box>
    </Box>
  );
}
