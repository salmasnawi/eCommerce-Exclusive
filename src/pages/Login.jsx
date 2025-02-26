import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // ✅ استيراد useDispatch
import { logIn } from "../store/authSlice"; // ✅ استيراد دالة تسجيل الدخول
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import "./Login.css";
import additionalImage2 from "../assets/Side Image.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ إعداد dispatch
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        setSuccess("Login successful!");

        // ✅ تحديث Redux و LocalStorage
        dispatch(logIn(user));
        localStorage.setItem("currentUser", JSON.stringify(user));

        setTimeout(() => navigate("/"), 2000);
      } else {
        setError("User not found or incorrect credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container className="login-container">
      <Row className="align-items-center">
        <Col md={6} className="login-image">
          <img src={additionalImage2} alt="Login" className="img-fluid" />
        </Col>
        <Col md={6} className="login-form">
          <h2>Login to your account</h2>
          <p>Enter your credentials below</p>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email or Phone Number"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100 mb-3">
              Log in
            </Button>

            <Button variant="light" className="w-100 google-login">
              <FaGoogle className="me-2" /> Log in with Google
            </Button>
          </Form>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
