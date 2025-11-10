import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import bookingService from '../../services/bookingService';
import type { Booking } from '../../services/bookingService';
import BookingApprovalModal from './BookingApprovalModal';

interface PendingBookingsListProps {
  refreshTrigger?: number;
}

export default function PendingBookingsList({ refreshTrigger }: PendingBookingsListProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadPendingBookings();
  }, [refreshTrigger]);

  const loadPendingBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const { bookings: data } = await bookingService.getBookings({ status: 'PENDING' });
      setBookings(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load pending bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId: string) => {
    try {
      await bookingService.approveBooking(bookingId);
      await loadPendingBookings();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to approve booking');
      throw err;
    }
  };

  const handleReject = async (bookingId: string, reason: string) => {
    try {
      await bookingService.rejectBooking(bookingId, reason);
      await loadPendingBookings();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reject booking');
      throw err;
    }
  };

  const openApprovalModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Pending Approvals
          {bookings.length > 0 && (
            <Chip label={bookings.length} color="warning" size="small" sx={{ ml: 1 }} />
          )}
        </Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={loadPendingBookings} size="small">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {bookings.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary" align="center">
              🎉 No pending bookings to review!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { boxShadow: 3 },
              }}
              onClick={() => openApprovalModal(booking)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {booking.facility?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      📍 {booking.facility?.location} • 👤 {booking.user?.name}
                    </Typography>
                  </Box>
                  <Chip label="PENDING" color="warning" size="small" />
                </Box>

                <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1, mb: 1 }}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Start:</strong> {formatDateTime(booking.startTime)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>End:</strong> {formatDateTime(booking.endTime)}
                  </Typography>
                </Box>

                {booking.purpose && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Purpose:</strong> {booking.purpose}
                  </Typography>
                )}

                <Typography variant="caption" color="text.secondary">
                  Requested {new Date(booking.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <BookingApprovalModal
        booking={selectedBooking}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </Box>
  );
}
