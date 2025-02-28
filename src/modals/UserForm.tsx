import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { User } from '../interfaces/UserInterface';
import { useForm } from 'react-hook-form';

interface UserFormProps {
  user: User;
  editMode: boolean;
  onInputChange: (field: keyof User, value: string) => void;
  onNestedInputChange: (parent: 'address' | 'company', field: string, value: string) => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  editMode,
  onInputChange,
  onNestedInputChange
}) => {
  const { register, formState: { errors } } = useForm<User>({
    defaultValues: user,
    mode: 'onChange'
  });
  
  return (
    <Form>
      <Row className="mb-3">
        <Col sm={4} className="fw-bold">ID:</Col>
        <Col>
          <Form.Control 
            plaintext 
            readOnly 
            value={user.id} 
          />
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold">Name:</Col>
        <Col>
          <Form.Control 
            {...register('name', { required: 'Name is required' })}
            type="text" 
            value={user.name} 
            readOnly={!editMode}
            plaintext={!editMode}
            onChange={(e) => onInputChange('name', e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold">Email:</Col>
        <Col>
          <Form.Control 
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email" 
            value={user.email} 
            readOnly={!editMode}
            plaintext={!editMode}
            onChange={(e) => onInputChange('email', e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold">Company:</Col>
        <Col>
          <Form.Control 
            type="text" 
            value={user.company?.name || ''} 
            readOnly={!editMode}
            plaintext={!editMode}
            onChange={(e) => onNestedInputChange('company', 'name', e.target.value)}
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
              value={user.address?.street || ''} 
              readOnly={!editMode}
              plaintext={!editMode}
              onChange={(e) => onNestedInputChange('address', 'street', e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label className="mb-0">Suite</Form.Label>
            <Form.Control 
              type="text" 
              value={user.address?.suite || ''} 
              readOnly={!editMode}
              plaintext={!editMode}
              onChange={(e) => onNestedInputChange('address', 'suite', e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label className="mb-0">City</Form.Label>
            <Form.Control 
              type="text" 
              value={user.address?.city || ''} 
              readOnly={!editMode}
              plaintext={!editMode}
              onChange={(e) => onNestedInputChange('address', 'city', e.target.value)}
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label className="mb-0">Zipcode</Form.Label>
            <Form.Control 
              type="text" 
              value={user.address?.zipcode || ''} 
              readOnly={!editMode}
              plaintext={!editMode}
              onChange={(e) => onNestedInputChange('address', 'zipcode', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold">Phone:</Col>
        <Col>
          <Form.Control 
            {...register('phone', {
              pattern: {
                value: /^[0-9-.()+\s]*$/,
                message: 'Invalid phone number format'
              }
            })}
            type="text" 
            value={user.phone || ''} 
            readOnly={!editMode}
            plaintext={!editMode}
            onChange={(e) => onInputChange('phone', e.target.value)}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone?.message}
          </Form.Control.Feedback>
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold">Website:</Col>
        <Col>
          <Form.Control 
            {...register('website', {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
                message: 'Invalid website URL'
              }
            })}
            type="text" 
            value={user.website || ''} 
            readOnly={!editMode}
            plaintext={!editMode}
            onChange={(e) => onInputChange('website', e.target.value)}
            isInvalid={!!errors.website}
          />
          <Form.Control.Feedback type="invalid">
            {errors.website?.message}
          </Form.Control.Feedback>
        </Col>
      </Row>
    </Form>
  );
};