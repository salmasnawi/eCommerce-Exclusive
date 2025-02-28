import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import CountdownTimer from '../Explore/CountdownTimer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FlashSales.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // ✅ جلب بيانات المستخدم
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userEmail = currentUser?.email; // ✅ الحصول على الإيميل إن وجد

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // ⭐ دالة لعرض التقييم بالنجوم
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} color={i < rating ? '#ffc107' : '#e4e5e9'} size={20} />
    ));
  };

  const handleAddToCart = (product) => {
    // ✅ إضافة المنتج إلى Redux
    dispatch(addToCart({ userId: userEmail || 'guest', product }));
  
    // ✅ تحديث localStorage بسلة المستخدم (يتم الحفظ باسم 'guest' إن لم يكن مسجلًا)
    const cartKey = userEmail ? `cart_${userEmail}` : 'cart_guest';
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    storedCart.push(product);
    localStorage.setItem(cartKey, JSON.stringify(storedCart));
  
    toast.success(`${product.title} added to cart!`, { position: 'top-right', autoClose: 3000 });
  };
  
  // 🔹 إعدادات السلايدر
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Container className="my-5">
      <div className="section-header">
        <span className="today-text">Today's</span>
        <span className="flash-sales-text">Flash Sales</span>
        <CountdownTimer />
      </div>

      <Slider {...sliderSettings}>
        {products.map((product) => (
          <div key={product.id} className="product-slide">
            <Card>
              <div className="image-container">
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <div className="discount-overlay">25% off</div>
              </div>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <span className="text-danger">${product.price}</span>
                </Card.Text>
                <div className="rating">
                  {renderStars(product.rating.rate)}
                  <span className="rating-count">({product.rating.count})</span>
                </div>
                <Button className="custom-button" onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>

      <ToastContainer />
    </Container>
  );
};

export default FlashSales;
