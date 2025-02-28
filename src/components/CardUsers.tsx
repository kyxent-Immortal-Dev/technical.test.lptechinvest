import { Row, Col, Card, Button } from 'react-bootstrap';
import { Eye, EnvelopeFill, BuildingFill } from 'react-bootstrap-icons';
import { User } from '../interfaces/UserInterface';

interface CardUsersProps {
  users: User[];
  theme: string;
  onShowDetails: (user: User) => void;
}

export default function CardUsers({ users, theme, onShowDetails }: CardUsersProps) {
  return (
    <Row xs={1} md={2} lg={3} className="g-4 user-card-container">
      {users.map((user) => (
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
                onClick={() => onShowDetails(user)}
                className="w-100 user-button"
              >
                <Eye className="me-1" /> View Details
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}