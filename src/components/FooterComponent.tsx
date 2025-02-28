import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Github, Linkedin, Twitter, EnvelopeFill, GeoAltFill, TelephoneFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import { useThemeStore } from '../store/themeStore';
import '../styles/modules/Footer.css';

const FooterComponent: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const year = new Date().getFullYear();
  
  return (
    <footer className={`footer-custom ${theme === 'dark' ? 'footer-dark' : 'footer-light'}`}>
      <Container>
        <Row className="main-footer py-5">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <div className="footer-brand mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="footer-logo-circle">UM</div>
                <h4 className="ms-2 mb-0">User Management</h4>
              </div>
              <p className="footer-description">
                A powerful application to manage your users with ease. Built with React, 
                Bootstrap, and Zustand for a seamless user experience.
              </p>
            </div>
            <div className="footer-contact">
              <div className="d-flex align-items-center mb-2">
                <GeoAltFill className="footer-icon me-2" />
                <p className="mb-0">123 Tech Street, Silicon Valley, CA</p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <TelephoneFill className="footer-icon me-2" />
                <p className="mb-0">+1 (123) 456-7890</p>
              </div>
              <div className="d-flex align-items-center">
                <EnvelopeFill className="footer-icon me-2" />
                <p className="mb-0">contact@usermanagement.com</p>
              </div>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading mb-4">Navigation</h5>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#users">Users</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading mb-4">Resources</h5>
            <ul className="footer-links">
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </Col>
          
          <Col lg={4} md={6}>
            <h5 className="footer-heading mb-4">Subscribe to Our Newsletter</h5>
            <p className="mb-4">Get the latest updates and news right in your inbox.</p>
            <InputGroup className="mb-3 newsletter-input">
              <Form.Control
                placeholder="Your email address"
                aria-label="Your email address"
                aria-describedby="newsletter-addon"
                className={theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}
              />
              <Button variant="primary" id="newsletter-addon" className="newsletter-btn">
                <ArrowRightCircleFill size={18} />
              </Button>
            </InputGroup>
            
            <h5 className="footer-heading mt-4 mb-3">Connect With Us</h5>
            <div className="social-icons">
              <a href="#github" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#twitter" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </Col>
        </Row>
        
        <hr className={theme === 'dark' ? 'border-secondary' : 'border-dark opacity-25'} />
        
        <Row className="py-3 copyright-row">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <p className="mb-0">
              &copy; {year} User Management. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#privacy" className="footer-policy-link me-3">Privacy Policy</a>
            <a href="#terms" className="footer-policy-link">Terms of Service</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;