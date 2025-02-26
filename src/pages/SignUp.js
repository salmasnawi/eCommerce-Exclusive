import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import "./SignUp.css";
import additionalImage2 from "../assets/Side Image.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000); // إخفاء التنبيه بعد 3 ثوانٍ

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
      const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}`);
      const existingUsers = await checkUser.json();

      if (existingUsers.length > 0) {
        setError("Email already registered. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container className="signup-container">
      <Row className="align-items-center">
        <Col md={6} className="signup-image">
          <img src={additionalImage2} alt="Sign Up" className="img-fluid" />
        </Col>

        <Col md={6} className="signup-form">
          <h2>Create an account</h2>
          <p>Enter your details below</p>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

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
              Create Account
            </Button>

            <Button variant="light" className="w-100 google-signup">
              <FaGoogle className="me-2" /> Sign up with Google
            </Button>
          </Form>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
