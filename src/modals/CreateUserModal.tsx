import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { User } from '../interfaces/UserInterface';
import { UsersService } from '../services/api/Users.service';
import { useThemeStore } from '../store/themeStore';
import { PersonPlus } from 'react-bootstrap-icons';
import UserFormCreate from './UserFormCreate';
import { showAlert } from '../utils/sweetalert';

interface CreateUserModalProps {
  onUserCreated: (user: User) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ onUserCreated }) => {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  const handleClose = () => {
    setShow(false);
  };
  
  const handleShow = () => setShow(true);

  const handleSubmit = async (data: User) => {
    setIsSubmitting(true);
    try {
      const response = await UsersService.create(data);
      
      showAlert({
        title: 'Success!',
        text: 'User created successfully',
        icon: 'success',
        confirmButtonColor: '#0d6efd'
      });
      
      onUserCreated(response.data);
      handleClose();
    } catch (error) {
      showAlert({
        title: 'Error!',
        text: 'Failed to create user',
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
      console.error('Error creating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button 
        variant="primary" 
        onClick={handleShow} 
        className="mb-3"
      >
        <PersonPlus className="me-2" /> Add New User
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true} 
        size="lg"
        centered
        className={isDarkMode ? 'modal-dark' : ''}
      >
        <Modal.Header 
          closeButton 
          className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}
        >
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
          <UserFormCreate 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting}
            isDarkMode={isDarkMode}
          />
        </Modal.Body>
        <Modal.Footer className={isDarkMode ? 'bg-dark border-secondary' : ''}>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            form="userForm"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create User'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateUserModal;