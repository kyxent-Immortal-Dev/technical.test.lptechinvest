import { Container, Alert, Button } from 'react-bootstrap';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <Container className="mt-4">
      <Alert variant="danger" className="user-alert">
        <Alert.Heading>Error Loading Data</Alert.Heading>
        <p>{error}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={onRetry} variant="outline-danger">
            Try Again
          </Button>
        </div>
      </Alert>
    </Container>
  );
}