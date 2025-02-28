import { Container } from 'react-bootstrap';

export default function LoadingSpinner() {
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