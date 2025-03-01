import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { User } from '../interfaces/UserInterface';
import { Telephone, Globe } from 'react-bootstrap-icons';
import FormFieldRow from './FormFieldRow';
import styles from '../styles/modules/Modal.module.css';

interface UserContactFieldsProps {
  control: Control<User>;
  errors: FieldErrors<User>;
  isDarkMode: boolean;
}

const UserContactFields: React.FC<UserContactFieldsProps> = ({ control, errors, isDarkMode }) => {
  const formControlClass = `${styles.formControl} ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`;

  return (
    <>
      <FormFieldRow 
        label={<><Telephone className="me-2" /> Phone:</>}
        error={errors.phone?.message}
      >
        <Controller
          name="phone"
          control={control}
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
              isInvalid={!!errors.phone}
              className={formControlClass}
            />
          )}
        />
      </FormFieldRow>
      
      <FormFieldRow 
        label={<><Globe className="me-2" /> Website:</>}
        error={errors.website?.message}
      >
        <Controller
          name="website"
          control={control}
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
              isInvalid={!!errors.website}
              className={formControlClass}
            />
          )}
        />
      </FormFieldRow>
    </>
  );
};

export default UserContactFields;