import { useEffect, useState } from 'react';
import { User } from '../interfaces/UserInterface';
import { UsersService } from '../services/api/Users.service';
import { Container, Button, Alert, Card, Badge, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import UserDetailModal from '../modals/UserDetailModal';
import { useThemeStore } from '../store/themeStore';
import '../styles/modules/UsersList.css';
import TableUsers from './TableUsers';
import CardUsers from './CardUsers';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import CreateUserModal from '../modals/CreateUserModal';

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
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    
    window.addEventListener('resize', checkIsMobile);
    
   
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  useEffect(() => {
    if (isMobile) {
      setViewMode('cards');
    }
  }, [isMobile]);

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
      
      return sortDirection === 'asc' ? (first > second ? 1 : -1) : (first < second ? 1 : -1);
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => window.location.reload()} />;
  }

  const handleUserCreated = () => {
  };

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
      
      <div className="d-flex justify-content-between align-items-center">
            
            <CreateUserModal onUserCreated={handleUserCreated} />
        </div>
      

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
      ) : (

        viewMode === 'table' ? (
          <TableUsers 
            users={filteredUsers} 
            theme={theme} 
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort} 
            onShowDetails={handleShowModal} 
          />
        ) : (
          <CardUsers 
            users={filteredUsers} 
            theme={theme} 
            onShowDetails={handleShowModal} 
          />
        )
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