import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { User } from '../interfaces/UserInterface';
import { useForm, Controller } from 'react-hook-form';
import styles from '../styles/modules/Modal.module.css';
import { useThemeStore } from '../store/themeStore';
import { 
  Person, 
  Envelope, 
  Building, 
  GeoAlt, 
  Telephone, 
  Globe
} from 'react-bootstrap-icons';

interface UserFormProps {
  user: User;
  editMode: boolean;
  onSubmit: (data: User) => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  editMode,
  onSubmit
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<User>({
    defaultValues: user,
    mode: 'onChange'
  });
  
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';
  
  const formControlClass = `${styles.formControl} ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`;
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)} id="userForm">
      <Row className="mb-3">
        <Col sm={4} className="fw-bold d-flex align-items-center">
          <Person className="me-2" /> ID:
        </Col>
        <Col>
          <Form.Control 
            plaintext 
            readOnly 
            value={user.id}
            className={isDarkMode ? 'text-light' : ''}
          />
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold d-flex align-items-center">
          <Person className="me-2" /> Name:
        </Col>
        <Col>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <Form.Control 
                {...field}
                type="text" 
                readOnly={!editMode}
                plaintext={!editMode}
                isInvalid={!!errors.name}
                className={editMode ? formControlClass : isDarkMode ? 'text-light' : ''}
              />
            )}
          />
          {errors.name && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.name?.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold d-flex align-items-center">
          <Envelope className="me-2" /> Email:
        </Col>
        <Col>
          <Controller
            name="email"
            control={control}
            rules={{ 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field }) => (
              <Form.Control 
                {...field}
                type="email" 
                readOnly={!editMode}
                plaintext={!editMode}
                isInvalid={!!errors.email}
                className={editMode ? formControlClass : isDarkMode ? 'text-light' : ''}
              />
            )}
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.email?.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold d-flex align-items-center">
          <Building className="me-2" /> Company:
        </Col>
        <Col>
          <Controller
            name="company.name"
            control={control}
            defaultValue={user.company?.name || ''}
            render={({ field }) => (
              <Form.Control 
                {...field}
                type="text" 
                readOnly={!editMode}
                plaintext={!editMode}
                className={editMode ? formControlClass : isDarkMode ? 'text-light' : ''}
              />
            )}
          />
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold d-flex align-items-center">
          <GeoAlt className="me-2" /> Address:
        </Col>
        <Col>
          <div className={`p-3 rounded ${isDarkMode ? 'bg-dark border border-secondary' : 'bg-light border'}`}>
            <Form.Group className="mb-2">
              <Form.Label className={`${styles.formLabel} ${isDarkMode ? 'text-light' : ''}`}>Street</Form.Label>
              <Controller
                name="address.street"
                control={control}
                defaultValue={user.address?.street || ''}
                render={({ field }) => (
                  <Form.Control 
                    {...field}
                    type="text" 
                    readOnly={!editMode}
                    plaintext={!editMode}
                    className={editMode ? formControlClass : isDarkMode ? 'text-light' : ''}
                  />
                )}
              />
            </Form.Group>
            
            <Form.Group className="mb-2">
              <Form.Label className={`${styles.formLabel} ${isDarkMode ? 'text-light' : ''}`}>Suite</Form.Label>
              <Controller
                name="address.suite"
                control={control}
                defaultValue={user.address?.suite || ''}
                render={({ field }) => (
                  <Form.Control 
                    {...field}
                    type="text" 
                    readOnly={!editMode}
                    plaintext={!editMode}
                    className={editMode ? formControlClass : isDarkMode ? 'text-light' : ''}
                  />
                )}
              />
            </Form.Group>
            
            <Form.Group className="mb-2">
              <Form.Label className={`${styles.formLabel} ${isDarkMode ? 'text-light' : ''}`}>City</Form.Label>
              <Controller
                name="address.city"
                control={control}
                defaultValue={user.address?.city || ''}
                render={({ field }) => (
                  <Form.Control 
                    {...field}
                    type="text" 
                    readOnly={!editMode}
                    plaintext={!editMode}
                    className={editMode ? formControlClass : isDarkMode ? 'text-light' : ''}
                  />
                )}
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label className={`${styles.formLabel} ${isDarkMode ? 'text-light' : ''}`}>Zipcode</Form.Label>
              <Controller
                name="address.zipcode"
                control={control}
                defaultValue={user.address?.zipcode || ''}
                render={({ field }) => (
                  <Form.Control 
                    {...field}
                    type="text" 
                    readOnly={!editMode}
                    plaintext={!editMode}
                    className={editMode ? formControlClass : isDarkMode ? 'text-light' : ''}
                  />
                )}
              />
            </Form.Group>
          </div>
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold d-flex align-items-center">
          <Telephone className="me-2" /> Phone:
        </Col>
        <Col>
          <Controller
            name="phone"
            control={control}
            defaultValue={user.phone || ''}
            rules={{
              pattern: {
                value: /^[0-9-.()+\s]*$/,
                message: 'Invalid phone number format'
              }
            }}
            render={({ field }) => (
              <Form.Control 
                {...field}
                type="text" 
                readOnly={!editMode}
                plaintext={!editMode}
                isInvalid={!!errors.phone}
                className={editMode ? formControlClass : isDarkMode ? 'text-light' : ''}
              />
            )}
          />
          {errors.phone && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.phone?.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={4} className="fw-bold d-flex align-items-center">
          <Globe className="me-2" /> Website:
        </Col>
        <Col>
          <Controller
            name="website"
            control={control}
            defaultValue={user.website || ''}
            rules={{
              pattern: {
                value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
                message: 'Invalid website URL'
              }
            }}
            render={({ field }) => (
              <Form.Control 
                {...field}
                type="text" 
                readOnly={!editMode}
                plaintext={!editMode}
                isInvalid={!!errors.website}
                className={editMode ? formControlClass : isDarkMode ? 'text-light' : ''}
              />
            )}
          />
          {errors.website && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.website?.message}
            </Form.Control.Feedback>
          )}
        </Col>
      </Row>
      

    </Form>
  );
};