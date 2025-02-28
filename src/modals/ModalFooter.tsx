import React from 'react';
import { Button } from 'react-bootstrap';
import { Pencil, Trash, Save, X } from 'react-bootstrap-icons';

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
          <Button variant="success" onClick={onSave}>
            <Save className="me-1" /> Save
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            <X className="me-1" /> Cancel
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline-primary" onClick={onEdit}>
            <Pencil className="me-1" /> Edit
          </Button>
          <Button variant="outline-danger" onClick={onDelete}>
            <Trash className="me-1" /> Delete
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </>
      )}
    </>
  );
};