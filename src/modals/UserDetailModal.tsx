import { Modal } from 'react-bootstrap';
import { User } from '../interfaces/UserInterface';
import { useUserForm } from '../hooks/useUserForm';
import { UserForm } from './UserForm';
import { ModalFooter } from './ModalFooter';

interface UserDetailModalProps {
  user: User | null;
  show: boolean;
  onHide: () => void;
  onUserDeleted: (id: number) => void;
  onUserUpdated: (user: User) => void;
}

export default function UserDetailModal({ 
  user, 
  show, 
  onHide, 
  onUserDeleted,
  onUserUpdated 
}: UserDetailModalProps) {
  
  const {
    editMode,
    updatedUser,
    handleEdit,
    handleCancel,
    handleInputChange,
    handleNestedInputChange,
    handleSave,
    handleDelete
  } = useUserForm({
    user,
    onUserDeleted,
    onUserUpdated,
    onClose: onHide
  });

  if (!user || !updatedUser) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? 'Edit User' : 'User Details'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm
          user={updatedUser}
          editMode={editMode}
          onInputChange={handleInputChange}
          onNestedInputChange={handleNestedInputChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <ModalFooter
          editMode={editMode}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={onHide}
        />
      </Modal.Footer>
    </Modal>
  );
}