import { Alert, AlertTitle, Box, Button, Typography, Card, CardContent } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface AlternativeSlot {
  startTime: string;
  endTime: string;
}

interface ConflictAlertProps {
  alternatives: AlternativeSlot[];
  onSelectAlternative: (slot: AlternativeSlot) => void;
  onDismiss: () => void;
}

export default function ConflictAlert({ alternatives, onSelectAlternative, onDismiss }: ConflictAlertProps) {
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
    <Alert severity="warning" onClose={onDismiss} sx={{ mb: 3 }}>
      <AlertTitle>⚠️ Time Slot Not Available</AlertTitle>
      <Typography variant="body2" gutterBottom>
        The selected time slot conflicts with an existing booking. Here are some alternative times:
      </Typography>

      {alternatives.length > 0 ? (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {alternatives.map((slot, index) => (
            <Card
              key={index}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={() => onSelectAlternative(slot)}
            >
              <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon fontSize="small" color="primary" />
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {formatDateTime(slot.startTime)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      to {new Date(slot.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </Typography>
                  </Box>
                  <Button size="small" variant="outlined" sx={{ ml: 'auto' }}>
                    Select
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          No alternative slots available in the next 7 days. Please try a different date.
        </Typography>
      )}
    </Alert>
  );
}
