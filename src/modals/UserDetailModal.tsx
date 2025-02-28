import { Modal, Badge } from 'react-bootstrap';
import { User } from '../interfaces/UserInterface';
import { useUserForm } from '../hooks/useUserForm';
import { UserForm } from './UserForm';
import { ModalFooter } from './ModalFooter';
import styles from '../styles/modules/Modal.module.css';
import { useThemeStore } from '../store/themeStore';

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
    handleSave,
    handleDelete
  } = useUserForm({
    user,
    onUserDeleted,
    onUserUpdated,
    onClose: onHide
  });

  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  if (!user || !updatedUser) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };


  const handleFormSubmit = () => {
    handleSave();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      contentClassName={`${styles.modalContent} ${isDarkMode ? styles.darkModal : ''}`}
      className={styles.modal}
    >
      <Modal.Header
        closeButton
        className={`${isDarkMode ? styles.darkModalHeader : ''}`}
      >
        <Modal.Title className="d-flex align-items-center">
          <div className={styles.avatar}>
            {getInitials(updatedUser.name)}
          </div>
          <div className="ms-3">
            <div>{editMode ? 'Edit User' : 'User Details'}</div>
            <Badge
              bg={editMode ? "warning" : "info"}
              className="mt-1"
            >
              {editMode ? 'Editing Mode' : `User ID: ${updatedUser.id}`}
            </Badge>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm
          user={updatedUser}
          editMode={editMode}
          onSubmit={handleFormSubmit}
        />
      </Modal.Body>
      <Modal.Footer className={isDarkMode ? styles.darkModalFooter : ''}>
        <ModalFooter
          editMode={editMode}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
          onDelete={handleDelete}
          onClose={onHide}
        />
      </Modal.Footer>
    </Modal>
  );
}