import { useEffect, useState } from 'react';
import { User } from '../interfaces/UserInterface';
import { UsersService } from '../services/api/Users.service';
import { Table, Container, Button, Alert, Card, Badge, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { Eye, Search, SortDown, SortUp, EnvelopeFill, BuildingFill } from 'react-bootstrap-icons';
import UserDetailModal from '../modals/UserDetailModal';
import { useThemeStore } from '../store/themeStore';
import '../styles/modules/UsersList.css';

export default function UsersListComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  const theme = useThemeStore((state) => state.theme);

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

  useEffect(() => {
    let results = [...users];
    

    if (searchTerm) {
      results = results.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.company?.name && user.company.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    

    results.sort((a, b) => {
      let first, second;
      
      if (sortField === 'company') {
        first = a.company?.name || '';
        second = b.company?.name || '';
      } else {
        first = a[sortField as keyof User] || '';
        second = b[sortField as keyof User] || '';
      }
      
      if (typeof first === 'string') {
        first = first.toLowerCase();
        second = second.toString().toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return first > second ? 1 : -1;
      } else {
        return first < second ? 1 : -1;
      }
    });
    
    setFilteredUsers(results);
  }, [users, searchTerm, sortField, sortDirection]);

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
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(prevUsers => 
      prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user)
    );
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <SortUp size={14} /> : <SortDown size={14} />;
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <div className="custom-spinner">
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status" style={{ animationDelay: '0.2s' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status" style={{ animationDelay: '0.4s' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <p className="mt-3">Loading users...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" className="user-alert">
          <Alert.Heading>Error Loading Data</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => window.location.reload()} variant="outline-danger">
              Try Again
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="mb-0 user-list-title">
          <Badge bg="primary" className="me-2 user-count-badge">
            {filteredUsers.length}
          </Badge>
          User Management
        </h2>
        
        <div className="d-flex align-items-center mt-3 mt-md-0">
          <div className="view-toggle me-3">
            <Button 
              variant={viewMode === 'table' ? 'primary' : (theme === 'dark' ? 'outline-light' : 'outline-dark')}
              size="sm" 
              onClick={() => setViewMode('table')}
              className="me-1"
            >
              Table
            </Button>
            <Button 
              variant={viewMode === 'cards' ? 'primary' : (theme === 'dark' ? 'outline-light' : 'outline-dark')}
              size="sm" 
              onClick={() => setViewMode('cards')}
            >
              Cards
            </Button>
          </div>
        </div>
      </div>
      
      <Card className={`mb-4 search-card ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}>
        <Card.Body>
          <InputGroup>
            <InputGroup.Text id="search-addon" className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}>
              <Search />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name, email, or company..."
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
            />
            {searchTerm && (
              <Button 
                variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                onClick={() => setSearchTerm('')}
              >
                Clear
              </Button>
            )}
          </InputGroup>
        </Card.Body>
      </Card>
      
      {filteredUsers.length === 0 ? (
        <Alert variant="info" className="text-center user-alert">
          <div className="mb-3">
            <Search size={40} />
          </div>
          <Alert.Heading>No Users Found</Alert.Heading>
          <p>No users found matching your search criteria. Try adjusting your search or clear filters.</p>
          <Button variant="primary" onClick={() => setSearchTerm('')}>
            Clear Search
          </Button>
        </Alert>
      ) : viewMode === 'table' ? (
        <div className="table-responsive user-table-container">
          <Table bordered hover responsive className={`user-table ${theme === 'dark' ? 'table-dark' : 'table-light'}`}>
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} className="user-th">
                  <div className="d-flex justify-content-between align-items-center">
                    ID {sortIcon('id')}
                  </div>
                </th>
                <th onClick={() => handleSort('name')} className="user-th">
                  <div className="d-flex justify-content-between align-items-center">
                    Name {sortIcon('name')}
                  </div>
                </th>
                <th onClick={() => handleSort('email')} className="user-th d-none d-md-table-cell">
                  <div className="d-flex justify-content-between align-items-center">
                    Email {sortIcon('email')}
                  </div>
                </th>
                <th onClick={() => handleSort('company')} className="user-th d-none d-md-table-cell">
                  <div className="d-flex justify-content-between align-items-center">
                    Company {sortIcon('company')}
                  </div>
                </th>
                <th className="user-th text-center">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="user-tr">
                  <td>{user.id}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="user-avatar me-2">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="d-none d-md-table-cell">{user.email}</td>
                  <td className="d-none d-md-table-cell">{user.company?.name || 'N/A'}</td>
                  <td className="text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleShowModal(user)}
                      className="user-button"
                    >
                      <Eye />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4 user-card-container">
          {filteredUsers.map((user) => (
            <Col key={user.id}>
              <Card className={`user-card h-100 ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="user-card-avatar me-3">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <Card.Title className="mb-1">{user.name}</Card.Title>
                      <Card.Subtitle className="text-muted" style={{ color: theme === 'dark' ? '#adb5bd' : '' }}>
                        ID: {user.id}
                      </Card.Subtitle>
                    </div>
                  </div>
                  
                  <div className="user-info-item">
                    <EnvelopeFill className="me-2 text-primary" />
                    <span>{user.email}</span>
                  </div>
                  
                  <div className="user-info-item">
                    <BuildingFill className="me-2 text-primary" />
                    <span>{user.company?.name || 'N/A'}</span>
                  </div>
                </Card.Body>
                <Card.Footer className={`text-center ${theme === 'dark' ? 'bg-dark border-secondary' : 'bg-light'}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleShowModal(user)}
                    className="w-100 user-button"
                  >
                    <Eye className="me-1" /> View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
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