import React from 'react';
import { Button } from 'react-bootstrap';
import { Pencil, Trash, Save, X, ArrowLeft } from 'react-bootstrap-icons';

interface ModalFooterProps {
  editMode: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  editMode,
  onEdit,
  onCancel,
  onSave,
  onDelete,
  onClose
}) => {
  return (
    <>
      {editMode ? (
        <>
          <Button variant="success" onClick={onSave} className="d-flex align-items-center">
            <Save className="me-2" size={18} /> Save Changes
          </Button>
          <Button variant="secondary" onClick={onCancel} className="d-flex align-items-center">
            <X className="me-2" size={18} /> Cancel
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline-primary" onClick={onEdit} className="d-flex align-items-center">
            <Pencil className="me-2" size={18} /> Edit
          </Button>
          <Button variant="outline-danger" onClick={onDelete} className="d-flex align-items-center">
            <Trash className="me-2" size={18} /> Delete
          </Button>
          <Button variant="secondary" onClick={onClose} className="d-flex align-items-center">
            <ArrowLeft className="me-2" size={18} /> Close
          </Button>
        </>
      )}
    </>
  );
};
