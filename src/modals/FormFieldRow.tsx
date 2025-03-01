import React, { ReactNode } from 'react';
import { Row, Col, Form } from 'react-bootstrap';


interface FormFieldRowProps {
  label: ReactNode;
  error?: string;
  children: ReactNode;
}

const FormFieldRow: React.FC<FormFieldRowProps> = ({ label, error, children }) => {
  return (
    <Row className="mb-3">
      <Col sm={4} className="fw-bold d-flex align-items-center">
        {label}
      </Col>
      <Col>
        {children}
        {error && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {error}
          </Form.Control.Feedback>
        )}
      </Col>
    </Row>
  );
};

export default FormFieldRow;