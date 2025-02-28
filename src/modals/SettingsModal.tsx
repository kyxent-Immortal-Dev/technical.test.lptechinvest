import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useThemeStore } from '../store/themeStore';

interface SettingsModalProps {
  show: boolean;
  onHide: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ show, onHide }) => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Theme</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Label className="me-3 mb-0">Light</Form.Label>
              <Form.Check
                type="switch"
                id="theme-switch"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                label=""
              />
              <Form.Label className="ms-1 mb-0">Dark</Form.Label>
            </div>
            <Form.Text className="text-muted">
              Choose between light and dark theme for the application.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;