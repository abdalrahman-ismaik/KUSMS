import { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  IconButton, Typography, Box, Chip 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '../common/Button';
import Modal from '../common/Modal';
import FacilityForm from './FacilityForm';
import facilityService from '../../services/facilityService';
import type { Facility, CreateFacilityData } from '../../services/facilityService';

export default function FacilityList() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | undefined>(undefined);

  const fetchFacilities = async () => {
    try {
      const { facilities } = await facilityService.getFacilities();
      setFacilities(facilities);
    } catch (error) {
      console.error('Failed to fetch facilities', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleCreate = async (data: CreateFacilityData) => {
    await facilityService.createFacility(data);
    setIsModalOpen(false);
    fetchFacilities();
  };

  const handleUpdate = async (data: CreateFacilityData) => {
    if (editingFacility) {
      await facilityService.updateFacility(editingFacility.id, data);
      setIsModalOpen(false);
      setEditingFacility(undefined);
      fetchFacilities();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      await facilityService.deleteFacility(id);
      fetchFacilities();
    }
  };

  const openCreateModal = () => {
    setEditingFacility(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (facility: Facility) => {
    setEditingFacility(facility);
    setIsModalOpen(true);
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Facilities</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={openCreateModal}
        >
          Add Facility
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilities.map((facility) => (
              <TableRow key={facility.id}>
                <TableCell>{facility.name}</TableCell>
                <TableCell>
                  <Chip label={facility.type} size="small" />
                </TableCell>
                <TableCell>{facility.capacity}</TableCell>
                <TableCell>{facility.location}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => openEditModal(facility)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(facility.id)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFacility ? 'Edit Facility' : 'Add Facility'}
      >
        <FacilityForm
          initialData={editingFacility}
          onSubmit={editingFacility ? handleUpdate : handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </Box>
  );
}
