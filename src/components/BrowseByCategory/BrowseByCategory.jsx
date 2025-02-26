import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaMobileAlt, FaLaptop, FaClock, FaCamera, FaHeadphones, FaGamepad } from 'react-icons/fa'; // أيقونات من React Icons
import "./BrowseByCategory.css"; // ملف الـ CSS الخاص بالتصميم

// بيانات التصنيفات مع الأيقونات
const categories = [
  { id: 1, name: 'iPhone', icon: <FaMobileAlt size={24} /> }, // تغيير "Phones" إلى "iPhone"
  { id: 2, name: 'labtop', icon: <FaLaptop size={24} /> },
  { id: 3, name: 'Watchs', icon: <FaClock size={24} /> },
  { id: 4, name: 'Camera', icon: <FaCamera size={24} /> }, // تغيير "Cameras" إلى "Camera"
  { id: 5, name: 'HPhon', icon: <FaHeadphones size={24} /> },
  { id: 6, name: 'Gaming', icon: <FaGamepad size={24} /> },
];

const BrowseByCategory = () => {
  return (
    <Container className="my-5">
      <div className="section-header">
        <span className="flash-sales-text fs-3">Browse By Category</span>
      </div>
      <Row className="justify-content-center">
        {categories.map((category) => (
          <Col key={category.id} className="mb-4" style={{ flex: '0 0 auto', width: 'auto' }}>
            <Card className="category-card">
              <Card.Body className="text-center">
                <div className="icon-container">
                  <div className="category-icon">{category.icon}</div>
                </div>
                <Card.Title className="category-name">{category.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BrowseByCategory;