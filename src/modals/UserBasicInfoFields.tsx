import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { User } from '../interfaces/UserInterface';
import { Person, Envelope, Building } from 'react-bootstrap-icons';
import FormFieldRow from './FormFieldRow';
import styles from '../styles/modules/Modal.module.css';

interface UserBasicInfoFieldsProps {
  control: Control<User>;
  errors: FieldErrors<User>;
  isDarkMode: boolean;
}

const UserBasicInfoFields: React.FC<UserBasicInfoFieldsProps> = ({ control, errors, isDarkMode }) => {
  const formControlClass = `${styles.formControl} ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`;

  return (
    <>
      <FormFieldRow 
        label={<><Person className="me-2" /> Name:</>}
        error={errors.name?.message}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <Form.Control 
              {...field}
              type="text"
              isInvalid={!!errors.name}
              className={formControlClass}
            />
          )}
        />
      </FormFieldRow>
      
      <FormFieldRow 
        label={<><Person className="me-2" /> Username:</>}
        error={errors.username?.message}
      >
        <Controller
          name="username"
          control={control}
          rules={{ required: 'Username is required' }}
          render={({ field }) => (
            <Form.Control 
              {...field}
              type="text"
              isInvalid={!!errors.username}
              className={formControlClass}
            />
          )}
        />
      </FormFieldRow>
      
      <FormFieldRow 
        label={<><Envelope className="me-2" /> Email:</>}
        error={errors.email?.message}
      >
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
              isInvalid={!!errors.email}
              className={formControlClass}
            />
          )}
        />
      </FormFieldRow>
      
      <FormFieldRow 
        label={<><Building className="me-2" /> Company:</>}
      >
        <Controller
          name="company.name"
          control={control}
          render={({ field }) => (
            <Form.Control 
              {...field}
              type="text"
              className={formControlClass}
            />
          )}
        />
      </FormFieldRow>
    </>
  );
};

export default UserBasicInfoFields;