import React from "react";
import { useSelector } from "react-redux"; // ✅ استيراد useSelector
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import "./Checkout.css";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.userCarts["currentUserId"] || []); // ✅ جلب المنتجات من Redux

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container className="checkout-container mt-5">
      <h2 className="text-center mb-4">Billing Details</h2>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="(Optional)" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control type="text" placeholder="Enter street address" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" />
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h4>Order Summary</h4>
            
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between">
                    <span>{item.title} (x{item.quantity})</span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>$100</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>${calculateSubtotal() + 100}</span>
                </div>
              </>
            )}

            <Form.Group controlId="payment-method" className="mt-3">
              <Form.Check type="radio" label="Cash on Delivery" name="paymentMethod" />
              <Form.Check type="radio" label={<><FaCcVisa /> <FaCcMastercard /> Credit Card</>} name="paymentMethod" />
              <Form.Check type="radio" label={<FaPaypal />} name="paymentMethod" />
            </Form.Group>
            <Button variant="danger" className="mt-3 w-100">Place Order</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
