import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import facilityService from '../../services/facilityService';
import { createMaintenanceRequest } from '../../services/maintenanceService';

interface Facility {
  id: string;
  name: string;
  location: string;
}

interface MaintenanceRequestFormProps {
  onRequestSubmitted: () => void;
}

const MaintenanceRequestForm: React.FC<MaintenanceRequestFormProps> = ({
  onRequestSubmitted,
}) => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [warning, setWarning] = useState('');

  const [formData, setFormData] = useState({
    facilityId: '',
    description: '',
    priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH',
    imageUrl: '',
  });

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const data = await facilityService.getFacilities();
      setFacilities(data.facilities);
    } catch (err: any) {
      setError('Failed to load facilities');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setWarning('');
    setLoading(true);

    try {
      const response = await createMaintenanceRequest(formData);
      
      if (response.warning) {
        setWarning(response.warning);
      }
      
      setSuccess('Maintenance request submitted successfully!');
      setFormData({
        facilityId: '',
        description: '',
        priority: 'MEDIUM',
        imageUrl: '',
      });
      
      onRequestSubmitted();
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Submit New Maintenance Request
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      {warning && (
        <Alert severity="warning" sx={{ mb: 2 }} onClose={() => setWarning('')}>
          {warning}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          select
          fullWidth
          label="Facility"
          value={formData.facilityId}
          onChange={(e) => handleChange('facilityId', e.target.value)}
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Select a facility</MenuItem>
          {facilities.map((facility) => (
            <MenuItem key={facility.id} value={facility.id}>
              {facility.name} - {facility.location}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
          placeholder="Please describe the issue in detail..."
          sx={{ mb: 2 }}
        />

        <TextField
          select
          fullWidth
          label="Priority"
          value={formData.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Image URL (Optional)"
          value={formData.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          placeholder="https://example.com/image.jpg"
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>
    </Box>
  );
};

export default MaintenanceRequestForm;
