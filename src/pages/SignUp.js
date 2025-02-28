import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from "./firebaseConfig"; // استيراد Firebase
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./SignUp.css";
import additionalImage2 from "../assets/Side Image.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      }, 5000); // عرض الرسالة لمدة 5 ثوانٍ
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟢 إنشاء حساب جديد باستخدام Firebase Auth
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ التحقق من صحة البريد الإلكتروني قبل الإرسال
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("❌ Please enter a valid email address.");
      return;
    }

    try {
      console.log("📧 Trying to create user with email:", formData.email);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      

      setSuccess("✅ Account created successfully!");
      localStorage.setItem("currentUser", JSON.stringify(user));

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("❌ Firebase Auth Error:", error.message);
      setError(`🔥 ${error.message}`);
    }
  };

  // 🔵 تسجيل الدخول باستخدام Google
  const handleGoogleSignUp = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      setSuccess("✅ Google sign-up successful!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error("❌ Google Auth Error:", error.message);
      setError(`🔥 ${error.message}`);
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

          {/* ✅ تنبيهات الأخطاء أو النجاح */}
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
              Create Account
            </Button>

            <Button
              variant="light"
              className="w-100 google-signup"
              onClick={handleGoogleSignUp}
            >
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
