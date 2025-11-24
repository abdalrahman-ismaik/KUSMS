import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import type { CreateUserData, UpdateUserData, User } from '../../services/userService';

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: CreateUserData | UpdateUserData) => Promise<void>;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateUserData>({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    department: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
        department: initialData.department || '',
        password: '' // Password not populated on edit
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!initialData && !formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />
      <TextField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />
      <TextField
        label={initialData ? "New Password (leave blank to keep current)" : "Password"}
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          value={formData.role}
          label="Role"
          onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
        >
          <MenuItem value="STUDENT">Student</MenuItem>
          <MenuItem value="FACULTY">Faculty</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Department"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        fullWidth
      />
      <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
        <Button onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? 'Saving...' : (initialData ? 'Update' : 'Create')}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
