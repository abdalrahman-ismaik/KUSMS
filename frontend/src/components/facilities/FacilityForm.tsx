import { useState, useEffect } from 'react';
import { Box, MenuItem } from '@mui/material';
import Input from '../common/Input';
import Button from '../common/Button';
import type { CreateFacilityData, Facility } from '../../services/facilityService';

interface FacilityFormProps {
  initialData?: Facility;
  onSubmit: (data: CreateFacilityData) => Promise<void>;
  onCancel: () => void;
}

const FACILITY_TYPES = [
  { value: 'CLASSROOM', label: 'Classroom' },
  { value: 'LAB', label: 'Laboratory' },
  { value: 'SPORTS', label: 'Sports Facility' },
  { value: 'AUDITORIUM', label: 'Auditorium' },
  { value: 'MEETING_ROOM', label: 'Meeting Room' },
  { value: 'OTHER', label: 'Other' },
];

export default function FacilityForm({ initialData, onSubmit, onCancel }: FacilityFormProps) {
  const [formData, setFormData] = useState<CreateFacilityData>({
    name: '',
    type: 'CLASSROOM',
    capacity: 0,
    location: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        type: initialData.type,
        capacity: initialData.capacity || 0,
        location: initialData.location,
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError('Failed to save facility');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          select
          label="Type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        >
          {FACILITY_TYPES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Input>
        <Input
          label="Capacity"
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
        />
        <Input
          label="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <Input
          label="Description"
          multiline
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        {error && <Box color="error.main">{error}</Box>}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" loading={loading}>
            {initialData ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
