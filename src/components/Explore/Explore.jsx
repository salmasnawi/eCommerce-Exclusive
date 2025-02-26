import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Explore.css';
import { useDispatch, useSelector } from 'react-redux'; // ✅ إضافة useSelector لجلب بيانات المستخدم
import { addToCart } from '../../store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ جلب بيانات المستخدم من Redux
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userEmail = currentUser?.email; // إذا لم يكن هناك مستخدم مسجل، ستكون `undefined`

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // ✅ منع إضافة المنتجات إذا لم يكن المستخدم مسجلًا
  const handleAddToCart = (product) => {
    if (!userEmail) {
      toast.warning('You need to log in first!', { position: 'top-right', autoClose: 3000 });
      navigate('/login'); // ❌ تحويل المستخدم إلى صفحة تسجيل الدخول
      return;
    }

    // ✅ إضافة المنتج إلى Redux
    dispatch(addToCart({ userId: userEmail, product }));

    // ✅ تخزين السلة في localStorage
    const storedCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
    storedCart.push(product);
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(storedCart));

    toast.success(`${product.title} added to cart!`, { position: 'top-right', autoClose: 3000 });
  };

  return (
    <Container className="my-5">
      <div className="section-header">
        <span className="flash-sales-text fs-3">Explore Our Products</span>
      </div>
      <Row>
        {products.slice(0, 4).map((product) => (
          <Col md={3} className="mb-4" key={product.id}>
            <Card className="product-card">
              <div className="product-image-container">
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </Button>
              </div>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <span className="text-danger">${product.price}</span>
                </Card.Text>
                <div className="rating">
                  {'★'.repeat(Math.round(product.rating.rate))}{' '}
                  <span className="reviews">({product.rating.count})</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Explore;
