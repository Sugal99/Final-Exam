import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BASE_URL = "https://v2.api.noroff.dev"; // Base URL

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages

    const user = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
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
      console.log("Login successful:", data);
      setSuccess("Login successful! Redirecting...");
      // Store the access token or any other required data
      localStorage.setItem("accessToken", data.data.accessToken);

      // Redirect to another page after successful login
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error logging in user:", error);
      setError(error.message); // Display the error message
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={4}>
          {" "}
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
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="text-center">
                {success}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="warning" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <p className="text-white">Dont have an account?</p>
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
