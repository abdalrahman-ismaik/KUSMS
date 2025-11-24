import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Button from '../common/Button';
import facilityService from '../../services/facilityService';
import type { Facility } from '../../services/facilityService';
import bookingService from '../../services/bookingService';
import type { CreateBookingData } from '../../services/bookingService';
import ConflictAlert from './ConflictAlert';

interface AlternativeSlot {
  startTime: string;
  endTime: string;
}

interface BookingFormProps {
  onSuccess?: () => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState('');
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs().add(1, 'hour').startOf('hour'));
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs().add(2, 'hour').startOf('hour'));
  const [purpose, setPurpose] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [facilitiesLoading, setFacilitiesLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [conflict, setConflict] = useState<{ alternatives: AlternativeSlot[] } | null>(null);

  // Load facilities on mount
  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      setFacilitiesLoading(true);
      const { facilities: data } = await facilityService.getFacilities();
      setFacilities(data);
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setError(err.response?.data?.error || 'Failed to load facilities');
    } finally {
      setFacilitiesLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setConflict(null);

    if (!selectedFacility || !startTime || !endTime) {
      setError('Please fill in all required fields');
      return;
    }

    if (endTime.isBefore(startTime)) {
      setError('End time must be after start time');
      return;
    }

    if (startTime.isBefore(dayjs())) {
      setError('Cannot book in the past');
      return;
    }

    try {
      setLoading(true);

      const bookingData: CreateBookingData = {
        facilityId: selectedFacility,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        purpose,
      };

      await bookingService.createBooking(bookingData);
      
      setSuccess('Booking request submitted successfully! Waiting for admin approval.');
      
      // Reset form
      setSelectedFacility('');
      setStartTime(dayjs().add(1, 'hour').startOf('hour'));
      setEndTime(dayjs().add(2, 'hour').startOf('hour'));
      setPurpose('');

      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      if (err.response?.data?.error === 'Time slot not available' && err.response?.data?.alternatives) {
        setConflict({ alternatives: err.response.data.alternatives });
        setError('');
      } else {
        setError(err.response?.data?.error || 'Failed to create booking');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAlternative = (slot: AlternativeSlot) => {
    setStartTime(dayjs(slot.startTime));
    setEndTime(dayjs(slot.endTime));
    setConflict(null);
    setError('');
  };

  if (facilitiesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create New Booking
        </Typography>

        {conflict && (
          <ConflictAlert
            alternatives={conflict.alternatives}
            onSelectAlternative={handleSelectAlternative}
            onDismiss={() => setConflict(null)}
          />
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth required>
            <InputLabel>Facility</InputLabel>
            <Select
              value={selectedFacility}
              label="Facility"
              onChange={(e) => setSelectedFacility(e.target.value)}
            >
              {facilities.map((facility) => (
                <MenuItem key={facility.id} value={facility.id}>
                  {facility.name} ({facility.type}) - {facility.location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              minDateTime={dayjs()}
              slotProps={{
                textField: { required: true, fullWidth: true },
              }}
            />

            <DateTimePicker
              label="End Time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              minDateTime={startTime || dayjs()}
              slotProps={{
                textField: { required: true, fullWidth: true },
              }}
            />
          </LocalizationProvider>

          <TextField
            label="Purpose (Optional)"
            multiline
            rows={3}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Describe the purpose of your booking..."
          />

          <Button type="submit" loading={loading} fullWidth>
            Submit Booking Request
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
