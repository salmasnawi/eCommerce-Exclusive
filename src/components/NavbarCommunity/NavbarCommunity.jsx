import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { FaEnvelope, FaHeart, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/authSlice";
import './NavbarCommunity.css';

const NavbarCommunity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    if (currentUser?.email) {
      // ✅ حذف بيانات العربة عند تسجيل الخروج
      localStorage.removeItem(`cart_${currentUser.email}`);
    }
    
    dispatch(logout());
    navigate('/'); // ✅ إعادة التوجيه للصفحة الرئيسية
  };

  return (
    <nav>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="m-auto">
              <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/contact")}>Contact</Nav.Link>
              <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>
              <Nav.Link onClick={() => navigate('/signup')}>JoinUs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar bg="light" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')} className="fs-4" style={{ cursor: 'pointer' }}>
            Exclusive
          </Navbar.Brand>

          <Form className="d-flex mx-auto search-bar w-50">
            <FormControl type="search" placeholder="Search community..." className="me-2" aria-label="Search" />
            <Button variant="outline-dark w-25">
              <FaSearch />
            </Button>
          </Form>

          <div className="d-flex icons ">
    
            <Nav.Link onClick={() => navigate('/cart')} className="me-3 position-relative">
              <FaShoppingCart size={24} />
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <FaUser size={24} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {currentUser ? (
                  <>
                    <Dropdown.Item onClick={() => navigate('/profile')}>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('/settings')}>Settings</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item> 
                  </>
                ) : (
                  <Dropdown.Item onClick={() => navigate('/login')}>Login</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>
    </nav>
  );
};

export default NavbarCommunity;
