import { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import BookingForm from '../components/booking/BookingForm';
import BookingList from '../components/booking/BookingList';

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBookingSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
    setActiveTab(1); // Switch to "My Bookings" tab
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Facility Booking
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Reserve facilities for your academic and extracurricular activities.
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="New Booking" />
          <Tab label="My Bookings" />
        </Tabs>
      </Paper>

      <Box>
        {activeTab === 0 && <BookingForm onSuccess={handleBookingSuccess} />}
        {activeTab === 1 && <BookingList refreshTrigger={refreshTrigger} />}
      </Box>
    </Box>
  );
}
