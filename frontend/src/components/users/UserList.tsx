import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Tooltip,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { userService } from '../../services/userService';
import type { User, CreateUserData, UpdateUserData } from '../../services/userService';
import UserModal from './UserModal';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUser = async (data: CreateUserData | UpdateUserData) => {
    try {
      if (selectedUser) {
        await userService.updateUser(selectedUser.id, data as UpdateUserData);
      } else {
        await userService.createUser(data as CreateUserData);
      }
      setIsModalOpen(false);
      setSelectedUser(undefined);
      fetchUsers();
      setSnackbar({ open: true, message: 'User saved successfully', severity: 'success' });
    } catch (err) {
      console.error('Failed to save user:', err);
      setSnackbar({ open: true, message: 'Failed to save user', severity: 'error' });
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedUser(undefined);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        fetchUsers();
        setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
      } catch (err) {
        console.error('Failed to delete user:', err);
        setSnackbar({ open: true, message: 'Failed to delete user', severity: 'error' });
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department || '-'}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditClick(user)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDeleteUser(user.id)} size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <UserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSubmit={handleSaveUser}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserList;
