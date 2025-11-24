import React from 'react';
import Modal from '../common/Modal';
import UserForm from './UserForm';
import type { CreateUserData, UpdateUserData, User } from '../../services/userService';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user?: User;
  onSubmit: (data: CreateUserData | UpdateUserData) => Promise<void>;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, user, onSubmit }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={user ? 'Edit User' : 'Add New User'}
    >
      <UserForm
        initialData={user}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default UserModal;
