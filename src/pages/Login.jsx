import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../store/authSlice";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from "./firebaseConfig"; // استيراد Firebase Auth
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./Login.css";
import additionalImage2 from "../assets/Side Image.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  // 🟢 تسجيل الدخول عبر البريد وكلمة المرور
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      setSuccess("Login successful!");
      dispatch(logIn(user));
      localStorage.setItem("currentUser", JSON.stringify(user));
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      setError("Invalid email or password.");
    }
  };

  // 🔵 تسجيل الدخول باستخدام Google
  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      setSuccess("Google login successful!");
      dispatch(logIn(user));
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error("Google Auth Error:", error);
      setError("Google login failed. Please try again.");
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
                placeholder="Email"
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

            <Button
              variant="light"
              className="w-100 google-login"
              onClick={handleGoogleLogin}
            >
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
