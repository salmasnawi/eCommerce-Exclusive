import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaTruck, FaHeadset, FaMoneyBillWave, FaArrowUp } from 'react-icons/fa';
import './FeaturedSection.css';
const additionalImage = require("../../assets/Frame 684.jpg");
const additionalImage2 = require("../../assets/Frame 738.jpg");

const FeaturedSection = () => {
  const [showScroll, setShowScroll] = React.useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  return (
    <Container className="featured-section">
      <Row>
      <div className="section-header">
        <span className="flash-sales-text fs-3">New Arrival</span>
      </div> 
        <Col md={6} className="featured-item">
          <img src={additionalImage} alt="Featured" className="img-fluid" />
        </Col>
        <Col md={6} className="featured-item">
          <img src={additionalImage2} alt="Women's Collections" className="img-fluid" />
        </Col>
      </Row>
      <Row className="services-section">
        <Col md={4} className="service-item">
          <FaTruck className="service-icon" />
          <h4>FREE AND FAST DELIVERY</h4>
          <p>570 Hug x 600 Hug</p>
        </Col>
        <Col md={4} className="service-item">
          <FaHeadset className="service-icon" />
          <h4>24/7 CUSTOMER SERVICE</h4>
          <p>We are always here to help you.</p>
        </Col>
        <Col md={4} className="service-item">
          <FaMoneyBillWave className="service-icon" />
          <h4>MONEY BACK GUARANTEE</h4>
          <p>30-day money-back guarantee.</p>
        </Col>
      </Row>
      {showScroll && (
  <Button onClick={scrollTop} className="scroll-top-button">
    <FaArrowUp />
  </Button>
)}
    </Container>
  );
};

export default FeaturedSection;