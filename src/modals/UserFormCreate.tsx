import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { User } from '../interfaces/UserInterface';
import UserBasicInfoFields from './UserBasicInfoFields';
import UserAddressFields from './UserAddressFields';
import UserContactFields from './UserContactFields';

interface UserFormProps {
  onSubmit: (data: User) => Promise<void>;
  isSubmitting: boolean;
  isDarkMode: boolean;
}

const UserFormCreate: React.FC<UserFormProps> = ({ onSubmit , isDarkMode }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<User>({
    defaultValues: {
      id: 0, 
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: ''
      },
      company: {
        name: ''
      }
    },
    mode: 'onChange'
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} id="userForm">
      <UserBasicInfoFields 
        control={control}
        errors={errors}
        isDarkMode={isDarkMode}
      />
      
      <UserAddressFields
        control={control}
        isDarkMode={isDarkMode}
      />
      
      <UserContactFields
        control={control}
        errors={errors}
        isDarkMode={isDarkMode}
      />
    </Form>
  );
};

export default UserFormCreate;