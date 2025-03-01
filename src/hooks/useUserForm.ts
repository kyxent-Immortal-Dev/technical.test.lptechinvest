import { useState, useEffect } from 'react';
import { User } from '../interfaces/UserInterface';
import { UsersService } from '../services/api/Users.service';
import { showAlert } from '../utils/sweetalert';

interface UseUserFormProps {
  user: User | null;
  onUserDeleted?: (id: number) => void;
  onUserUpdated?: (user: User) => void;
  onClose?: () => void;
}

interface AddressType {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
}

interface CompanyType {
  name?: string;
}

export const useUserForm = ({ 
  user, 
  onUserDeleted,
  onUserUpdated,
  onClose
}: UseUserFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setUpdatedUser({ ...user });
    }
  }, [user]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    if (user) {
      setUpdatedUser({ ...user });
    }
  };

  const handleInputChange = (field: keyof User, value: string) => {
    if (!updatedUser) return;
    
    setUpdatedUser({
      ...updatedUser,
      [field]: value
    });
  };

  const handleNestedInputChange = (
    parent: 'address' | 'company',
    field: string,
    value: string
  ) => {
    if (!updatedUser) return;
    
    const parentObject = updatedUser[parent] || {};
    
    setUpdatedUser({
      ...updatedUser,
      [parent]: {
        ...parentObject,
        [field]: value
      } as AddressType | CompanyType
    });
  };



const handleSave = async () => {
  try {
    if (updatedUser && user) {
      await UsersService.updateById(updatedUser.id, updatedUser);
      
      showAlert({
        title: 'Success!',
        text: 'User updated successfully',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true
      });
      
      if (onUserUpdated) {
        onUserUpdated(updatedUser);
      }
      setEditMode(false);
    }
  } catch (error) {
    showAlert({
      title: 'Error!',
      text: `Failed to update user: ${error}`,
      icon: 'error'
    });
    console.error('Error updating user:', error);
  }
};

const handleDelete = async () => {
  try {
    if (!user) return;
    
    const result = await showAlert({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    
    if (result.isConfirmed) {
      await UsersService.deleteById(user.id);
      
      showAlert({
        title: 'Deleted!',
        text: 'User has been deleted.',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true
      });
      
      if (onUserDeleted) {
        onUserDeleted(user.id);
      }
      if (onClose) {
        onClose();
      }
    }
  } catch (error) {
    showAlert({
      title: 'Error!',
      text: `Failed to delete user: ${error}`,
      icon: 'error'
    });
    console.error('Error deleting user:', error);
  }
};
  return {
    editMode,
    updatedUser,
    handleEdit,
    handleCancel,
    handleInputChange,
    handleNestedInputChange,
    handleSave,
    handleDelete
  };
};