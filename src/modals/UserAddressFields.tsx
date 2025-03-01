import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller, Control } from 'react-hook-form';
import { User } from '../interfaces/UserInterface';
import { GeoAlt } from 'react-bootstrap-icons';
import FormFieldRow from './FormFieldRow';
import styles from '../styles/modules/Modal.module.css';

interface UserAddressFieldsProps {
  control: Control<User>;
  isDarkMode: boolean;
}

const UserAddressFields: React.FC<UserAddressFieldsProps> = ({ control, isDarkMode }) => {
  const formControlClass = `${styles.formControl} ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`;

  return (
    <FormFieldRow 
      label={<><GeoAlt className="me-2" /> Address:</>}
    >
      <div className={`p-3 rounded ${isDarkMode ? 'bg-dark border border-secondary' : 'bg-light border'}`}>
        <Form.Group className="mb-2">
          <Form.Label className={`${styles.formLabel} ${isDarkMode ? 'text-light' : ''}`}>Street</Form.Label>
          <Controller
            name="address.street"
            control={control}
            render={({ field }) => (
              <Form.Control 
                {...field}
                type="text"
                className={formControlClass}
              />
            )}
          />
        </Form.Group>
        
        <Form.Group className="mb-2">
          <Form.Label className={`${styles.formLabel} ${isDarkMode ? 'text-light' : ''}`}>Suite</Form.Label>
          <Controller
            name="address.suite"
            control={control}
            render={({ field }) => (
              <Form.Control 
                {...field}
                type="text"
                className={formControlClass}
              />
            )}
          />
        </Form.Group>
        
        <Form.Group className="mb-2">
          <Form.Label className={`${styles.formLabel} ${isDarkMode ? 'text-light' : ''}`}>City</Form.Label>
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => (
              <Form.Control 
                {...field}
                type="text"
                className={formControlClass}
              />
            )}
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label className={`${styles.formLabel} ${isDarkMode ? 'text-light' : ''}`}>Zipcode</Form.Label>
          <Controller
            name="address.zipcode"
            control={control}
            render={({ field }) => (
              <Form.Control 
                {...field}
                type="text"
                className={formControlClass}
              />
            )}
          />
        </Form.Group>
      </div>
    </FormFieldRow>
  );
};

export default UserAddressFields;