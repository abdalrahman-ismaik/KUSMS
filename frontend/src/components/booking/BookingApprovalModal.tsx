import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '../common/Button';
import type { Booking } from '../../services/bookingService';

interface BookingApprovalModalProps {
  booking: Booking | null;
  open: boolean;
  onClose: () => void;
  onApprove: (bookingId: string) => Promise<void>;
  onReject: (bookingId: string, reason: string) => Promise<void>;
}

export default function BookingApprovalModal({
  booking,
  open,
  onClose,
  onApprove,
  onReject,
}: BookingApprovalModalProps) {
  const [rejectReason, setRejectReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleApprove = async () => {
    if (!booking) return;
    
    setLoading(true);
    setAction('approve');
    try {
      await onApprove(booking.id);
      handleClose();
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const handleReject = async () => {
    if (!booking || !rejectReason.trim()) return;
    
    setLoading(true);
    setAction('reject');
    try {
      await onReject(booking.id, rejectReason);
      handleClose();
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const handleClose = () => {
    setRejectReason('');
    setAction(null);
    onClose();
  };

  if (!booking) return null;

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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Review Booking Request</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* User Info */}
          <Box>
            <Typography variant="caption" color="text.secondary">
              Requested by
            </Typography>
            <Typography variant="body1">
              {booking.user?.name} ({booking.user?.email})
            </Typography>
            <Chip label={booking.user?.role} size="small" sx={{ mt: 0.5 }} />
          </Box>

          {/* Facility Info */}
          <Box>
            <Typography variant="caption" color="text.secondary">
              Facility
            </Typography>
            <Typography variant="body1">
              {booking.facility?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {booking.facility?.type} - {booking.facility?.location}
            </Typography>
          </Box>

          {/* Time */}
          <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Booking Time
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Start:</strong> {formatDateTime(booking.startTime)}
            </Typography>
            <Typography variant="body2">
              <strong>End:</strong> {formatDateTime(booking.endTime)}
            </Typography>
          </Box>

          {/* Purpose */}
          {booking.purpose && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Purpose
              </Typography>
              <Typography variant="body2">{booking.purpose}</Typography>
            </Box>
          )}

          {/* Rejection Reason Input */}
          <TextField
            label="Rejection Reason (Optional)"
            multiline
            rows={3}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Provide a reason for rejection..."
            helperText="This reason will be sent to the user"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleReject}
          variant="outlined"
          color="error"
          loading={loading && action === 'reject'}
          disabled={loading || !rejectReason.trim()}
          startIcon={<CancelIcon />}
        >
          Reject
        </Button>
        <Button
          onClick={handleApprove}
          loading={loading && action === 'approve'}
          disabled={loading}
          startIcon={<CheckCircleIcon />}
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
}
