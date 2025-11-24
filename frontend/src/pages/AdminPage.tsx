import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PendingBookingsList from '../components/booking/PendingBookingsList';
import AllBookingsList from '../components/booking/AllBookingsList';
import PendingEventsList from '../components/events/PendingEventsList';
import FacilityList from '../components/facilities/FacilityList';
import UserList from '../components/users/UserList';

export default function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/facilities') setActiveTab(3);
    else if (path === '/users') setActiveTab(4);
    else if (path === '/approvals') setActiveTab(0);
    // Default to 0 if unknown or just /approvals
  }, [location]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    switch (newValue) {
      case 0: navigate('/approvals'); break;
      case 1: navigate('/approvals'); break; // Keep on approvals page
      case 2: navigate('/approvals'); break; // Keep on approvals page
      case 3: navigate('/facilities'); break;
      case 4: navigate('/users'); break;
    }
  };

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
        <Tabs value={activeTab} onChange={handleTabChange}>
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
        {activeTab === 2 && <AllBookingsList />}
        {activeTab === 3 && <FacilityList />}
        {activeTab === 4 && <UserList />}
      </Box>
    </Box>
  );
}
