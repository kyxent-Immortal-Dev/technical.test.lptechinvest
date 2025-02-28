import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, Badge, Dropdown } from 'react-bootstrap';
import { Gear, SunFill, MoonFill, Bell, Person } from 'react-bootstrap-icons';
import SettingsModal from '../modals/SettingsModal';
import { useThemeStore } from '../store/themeStore';
import '../styles/modules/Navbar.css';

const NavbarComponent: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  
  const handleShowSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <Navbar
        bg={theme}
        variant={theme}
        expand="lg"
        fixed="top"
        className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''} ${theme === 'dark' ? 'navbar-dark-custom' : 'navbar-light-custom'}`}
      >
        <Container>
          <Navbar.Brand href="#home" className="brand-text">
            <div className="logo-container">
              <div className="logo-circle">UM</div>
              <span className="ms-2">User Management</span>
            </div>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className="nav-link-custom">Home</Nav.Link>
              <Nav.Link href="#users" className="nav-link-custom">Users</Nav.Link>
              <Nav.Link href="#about" className="nav-link-custom">About</Nav.Link>
            </Nav>
            
            <div className="d-flex align-items-center">
              <Button 
                variant={theme === 'light' ? 'outline-dark' : 'outline-light'}
                size="sm" 
                className="theme-toggle-btn me-2"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <MoonFill /> : <SunFill />}
              </Button>
              
              <Button
                variant={theme === 'light' ? 'outline-dark' : 'outline-light'}
                size="sm"
                className="notification-btn position-relative me-2"
                aria-label="Notifications"
              >
                <Bell />
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                >
                  3
                </Badge>
              </Button>
              
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant={theme === 'light' ? 'outline-dark' : 'outline-light'} 
                  id="dropdown-basic"
                  size="sm"
                  className="user-dropdown"
                >
                  <Person className="me-1" /> Admin
                </Dropdown.Toggle>

                <Dropdown.Menu className={theme === 'dark' ? 'dropdown-menu-dark' : ''}>
                  <Dropdown.Item href="#profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleShowSettings}>
                    <Gear className="me-1" /> Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#logout">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      

      <div className="navbar-spacer"></div>
      
      <SettingsModal
        show={showSettings}
        onHide={handleCloseSettings}
      />
    </>
  );
};

export default NavbarComponent;