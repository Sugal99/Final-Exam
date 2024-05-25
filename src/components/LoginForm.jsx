import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { createApiKey } from "../services.jsx/api/AuthApi";

const BASE_URL = "https://v2.api.noroff.dev"; // Base URL

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate email field
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email must be a valid email address.";
    } else if (!formData.email.endsWith("@stud.noroff.no")) {
      newErrors.email = "Email must be a valid stud.noroff.no email address.";
    }

    // Validate password field
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    setSuccess(null); // Clear previous success messages

    if (!validateForm()) {
      return;
    }

    const user = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(`${BASE_URL}/auth/login?_holidaze=true`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("API Response Data:", data); // Log the entire data object

      console.log("Login successful:", data);
      setSuccess("Login successful! Redirecting...");

      // Store the access token and email
      const accessToken = data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", data.data.name);

      // Fetch and/or generate the API key
      const apiKey = await createApiKey(accessToken);
      localStorage.setItem("apiKey", apiKey);

      console.log("Venue Manager status:", data.data.venueManager);
      localStorage.setItem(
        "venueManager",
        data.data.venueManager ? "true" : "false"
      );

      // Redirect to another page after successful login
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error logging in user:", error);
      setErrors({ submit: error.message }); // Display the error message
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={4}>
          <div
            className="p-4 rounded"
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#FFA100",
            }}
          >
            <div className="text-center mb-4">
              <img
                src="/HOLIDAZE Logo - BigCommerce Store Logo with Transparent Background.png"
                className="d-inline-block align-top img-fluid"
                alt="logo"
                style={{ width: "250px", height: "auto", marginLeft: "-2rem" }}
              />
            </div>
            <h3 className="text-center mb-3 font-weight-bold text-white">
              Login
            </h3>
            {errors.submit && (
              <Alert variant="danger" className="text-center">
                {errors.submit}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="text-center">
                {success}
              </Alert>
            )}
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="warning" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <p className="text-white">Don't have an account?</p>
              <Link to="/Register">
                <Button variant="link" className="text-white">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
