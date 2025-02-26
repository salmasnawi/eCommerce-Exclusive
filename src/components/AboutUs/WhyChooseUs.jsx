import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./WhyChooseUs.css";
import additionalImage from "../../assets/aboutUs.jpg";


const WhyChooseUs = () => {
  return (
    <Container className="my-5 why-choose-us">
      <Row className="align-items-center">
        {/* Image Column */}
        <Col md={6} className="text-center">
          <img 
            src={additionalImage}
            alt="Why Choose Us" 
            className="img-fluid why-image"
          />
        </Col>

        {/* Text Column */}
        <Col md={6}>
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-description">
            We provide top-quality products, excellent customer support, and a seamless shopping experience.
            Our commitment to customer satisfaction sets us apart.
          </p>
          <ul className="benefits-list">
            <li>✔ High-Quality Products</li>
            <li>✔ 24/7 Customer Support</li>
            <li>✔ Fast & Reliable Shipping</li>
            <li>✔ Secure Payment Methods</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default WhyChooseUs;
