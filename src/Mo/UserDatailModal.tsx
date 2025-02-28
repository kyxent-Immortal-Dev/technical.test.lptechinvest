import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { Pencil, Trash, Save, X } from 'react-bootstrap-icons';
import { User } from '../interfaces/UserInterface';
import { UsersService } from '../services/api/Users.service';

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
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setUpdatedUser({ ...user });
    }
  }, [user]);

  if (!user || !updatedUser) return null;

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setUpdatedUser({ ...user });
  };

  const handleInputChange = (field: keyof User, value: string) => {
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
    setUpdatedUser({
      ...updatedUser,
      [parent]: {
        ...(updatedUser[parent] as any),
        [field]: value
      }
    });
  };

  const handleSave = async () => {
    try {
      if (updatedUser) {
        await UsersService.updateById(updatedUser.id, updatedUser);
        onUserUpdated(updatedUser);
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await UsersService.deleteById(user.id);
        onUserDeleted(user.id);
        onHide();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? 'Edit User' : 'User Details'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">ID:</Col>
            <Col>
              <Form.Control 
                plaintext 
                readOnly 
                value={updatedUser.id} 
              />
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">Name:</Col>
            <Col>
              <Form.Control 
                type="text" 
                value={updatedUser.name} 
                readOnly={!editMode}
                plaintext={!editMode}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">Email:</Col>
            <Col>
              <Form.Control 
                type="email" 
                value={updatedUser.email} 
                readOnly={!editMode}
                plaintext={!editMode}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">Company:</Col>
            <Col>
              <Form.Control 
                type="text" 
                value={updatedUser.company?.name || ''} 
                readOnly={!editMode}
                plaintext={!editMode}
                onChange={(e) => handleNestedInputChange('company', 'name', e.target.value)}
              />
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">Address:</Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label className="mb-0">Street</Form.Label>
                <Form.Control 
                  type="text" 
                  value={updatedUser.address?.street || ''} 
                  readOnly={!editMode}
                  plaintext={!editMode}
                  onChange={(e) => handleNestedInputChange('address', 'street', e.target.value)}
                />
              </Form.Group>
              
              <Form.Group className="mb-2">
                <Form.Label className="mb-0">Suite</Form.Label>
                <Form.Control 
                  type="text" 
                  value={updatedUser.address?.suite || ''} 
                  readOnly={!editMode}
                  plaintext={!editMode}
                  onChange={(e) => handleNestedInputChange('address', 'suite', e.target.value)}
                />
              </Form.Group>
              
              <Form.Group className="mb-2">
                <Form.Label className="mb-0">City</Form.Label>
                <Form.Control 
                  type="text" 
                  value={updatedUser.address?.city || ''} 
                  readOnly={!editMode}
                  plaintext={!editMode}
                  onChange={(e) => handleNestedInputChange('address', 'city', e.target.value)}
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label className="mb-0">Zipcode</Form.Label>
                <Form.Control 
                  type="text" 
                  value={updatedUser.address?.zipcode || ''} 
                  readOnly={!editMode}
                  plaintext={!editMode}
                  onChange={(e) => handleNestedInputChange('address', 'zipcode', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">Phone:</Col>
            <Col>
              <Form.Control 
                type="text" 
                value={updatedUser.phone || ''} 
                readOnly={!editMode}
                plaintext={!editMode}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </Col>
          </Row>
          
          <Row className="mb-3">
            <Col sm={4} className="fw-bold">Website:</Col>
            <Col>
              <Form.Control 
                type="text" 
                value={updatedUser.website || ''} 
                readOnly={!editMode}
                plaintext={!editMode}
                onChange={(e) => handleInputChange('website', e.target.value)}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {editMode ? (
          <>
            <Button variant="success" onClick={handleSave}>
              <Save className="me-1" /> Save
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              <X className="me-1" /> Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline-primary" onClick={handleEdit}>
              <Pencil className="me-1" /> Edit
            </Button>
            <Button variant="outline-danger" onClick={handleDelete}>
              <Trash className="me-1" /> Delete
            </Button>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}