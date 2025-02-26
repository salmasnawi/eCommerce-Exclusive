import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHome, FaEnvelope, FaPhone } from 'react-icons/fa'; // لأيقونات وسائل التواصل الاجتماعي والاتصال
import './Footer.css'; // ملف الـ CSS الخاص بالتصميم

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        {/* الصف الأول: روابط سريعة واشتراك */}
        <Row className="mb-5">
          {/* قسم العلامة التجارية */}
          <Col md={3}>
            <h4 className="footer-brand">Exclusive</h4>
            <p className="footer-text">Subscribe to our newsletter for updates.</p>
          </Col>

          {/* قسم الحساب (Account) */}
          <Col md={3}>
            <h5 className="footer-title">Account</h5>
            <ul className="footer-links">
              <li><a href="/my-account">My Account</a></li>
              <li><a href="/wishlist">Wishlist</a></li>
              <li><a href="/login-register">Login / Register</a></li>
            </ul>
          </Col>

          {/* قسم الاتصال (Contact) */}
          <Col md={3}>
            <h5 className="footer-title">Contact</h5>
            <ul className="footer-links">
              <li>
                <FaHome className="me-2" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li>
                <FaEnvelope className="me-2" />
                <a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
              </li>
              <li>
                <FaPhone className="me-2" />
                <a href="tel:+8801688888989">+88016-88888-8989</a>
              </li>
            </ul>
          </Col>

          {/* الاشتراك في النشرة البريدية */}
          <Col md={3}>
            <h5 className="footer-title">Subscribe</h5>
            <Form>
              <Form.Control type="email" placeholder="Enter your email" className="mb-2" />
              <Button >Subscribe</Button>
            </Form>
          </Col>
        </Row>

        {/* الصف الثاني: وسائل التواصل الاجتماعي وحقوق النشر */}
        <Row className="align-items-center">
          <Col md={6}>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="footer-copyright">Copyright © Rimal 2022. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;