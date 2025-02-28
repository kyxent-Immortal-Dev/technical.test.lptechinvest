import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { User } from '../interfaces/UserInterface';

interface SearchComponentProps {
  users: User[];
  onSearchResults: (filteredUsers: User[]) => void;
}

export default function SearchComponent({ users, onSearchResults }: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      onSearchResults(users);
      return;
    }
    
    const filteredUsers = users.filter(user => 
      user.email.toLowerCase().includes(term)
    );
    
    onSearchResults(filteredUsers);
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="search-addon">
        <Search />
      </InputGroup.Text>
      <Form.Control
        placeholder="Search by email..."
        aria-label="Search by email"
        aria-describedby="search-addon"
        value={searchTerm}
        onChange={handleSearch}
      />
    </InputGroup>
  );
}