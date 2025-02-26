import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './BestSellingProducts.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // ✅ جلب المستخدم الحالي من Redux
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userEmail = currentUser?.email;

  const displayedProducts = showAll ? products : products.slice(0, 4);

  const handleAddToCart = (product) => {
    if (!userEmail) {
      toast.error('You need to log in first!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    // ✅ إضافة المنتج إلى Redux
    dispatch(addToCart({ userId: userEmail, product }));

    // ✅ تحديث localStorage بالعربة المحدثة
    const storedCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
    storedCart.push(product);
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(storedCart));

    toast.success(`Product added to cart!`, { position: 'top-right', autoClose: 3000 });
  };

  return (
    <Container className="my-5">
      <div className="section-header">
        <span className="flash-sales-text fs-3">Best Selling Products</span>
      </div>
      <Row>
        {displayedProducts.map((product) => (
          <Col md={3} className="mb-4" key={product.id}>
            <Card className="product-card">
              <div 
                className="product-image-container" 
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <div className="icon-overlay">
                  <Button variant="link" className="icon-btn"><FaHeart className="heart-icon" /></Button>
                  <Button variant="link" className="icon-btn"><FaEye className="eye-icon" /></Button>
                </div>
              </div>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <span className="text-danger">${product.price}</span>
                </Card.Text>
                <Button className='add-to-cart-btn' onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ زر Show More / Show Less */}
      <div className="text-center mt-4">
        <Button className='showAll btn w-25' onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </Button>
      </div>

      <ToastContainer />
    </Container>
  );
};

export default BestSellingProducts;
