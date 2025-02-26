import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactUs.css'; // ✅ ملف الـ CSS لمطابقة التصميم

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all fields!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    toast.success('Message sent successfully!', { position: 'top-right', autoClose: 3000 });
    setFormData({ name: '', email: '', message: '' }); // ✅ إعادة تعيين الحقول بعد الإرسال
  };

  return (
    <Container className="my-5">
      <div className="section-header">
        <span className="flash-sales-text fs-3">Contact Us</span>
      </div>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="contact-form">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                name="message" 
                rows={4} 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Write your message..."
              />
            </Form.Group>

            <Button className="send-btn w-100" type="submit">Send Message</Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default ContactUs;
