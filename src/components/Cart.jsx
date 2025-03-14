import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../store/cartSlice';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // ✅ استيراد useNavigate
import './Cart.css';
import Footer from "../components/Footer";
import NavbarCommunity from "../components/NavbarCommunity";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ استخدام التنقل
  const cartItems = useSelector((state) => state.cart.userCarts['currentUserId'] || []);

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ userId: 'currentUserId', productId }));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateCartItem({ userId: 'currentUserId', productId, quantity }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <NavbarCommunity />
      <Container className="my-5">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                        min="1"
                      />
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemove(item.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row className="mt-4">
              <Col md={6}>
                <Button variant="outline-dark" onClick={() => window.history.back()}>
                  Return To Shop
                </Button>
              </Col>
              <Col md={6} className="text-end">
                <div className="cart-total">
                  <h4>Cart Total</h4>
                  <p>Subtotal: ${calculateSubtotal()}</p>
                  <p>Shipping: Free</p>
                  <p>Total: ${calculateSubtotal()}</p>
                  <Button 
                    variant="dark" 
                    onClick={() => navigate('/checkout')} // ✅ توجيه المستخدم إلى صفحة الدفع فقط عند الضغط
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
