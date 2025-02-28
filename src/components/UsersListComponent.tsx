import { useEffect, useState } from 'react';
import { User } from '../interfaces/UserInterface';
import { UsersService } from '../services/api/Users.service';
import { Table, Container, Button, Alert } from 'react-bootstrap';
import { Eye } from 'react-bootstrap-icons';
import UserDetailModal from '../modals/UserDetailModal';
import SearchComponent from '../components/SearchComponent';

export default function UsersListComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const usersData = await UsersService.getAll();
        setUsers(usersData);
        setFilteredUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleShowModal = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleUserDeleted = (id: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(prevUsers => 
      prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user)
    );
    setFilteredUsers(prevUsers => 
      prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user)
    );
  };

  const handleSearchResults = (results: User[]) => {
    setFilteredUsers(results);
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading users...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">User List</h2>
      
      <SearchComponent 
        users={users} 
        onSearchResults={handleSearchResults} 
      />
      
      {filteredUsers.length === 0 ? (
        <Alert variant="info">No users found matching your search criteria.</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-light shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Email</th>
              <th className="d-none d-md-table-cell">Company</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td className="d-none d-md-table-cell">{user.email}</td>
                <td className="d-none d-md-table-cell">{user.company?.name}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleShowModal(user)}
                      className="me-1"
                    >
                      <Eye />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      
      {selectedUser && (
        <UserDetailModal 
          user={selectedUser} 
          show={showModal} 
          onHide={handleCloseModal}
          onUserDeleted={handleUserDeleted}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </Container>
  );
}