import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const BASE_URL = "https://v2.api.noroff.dev"; // Base URL

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages

    // Validate email domain
    if (!formData.email.endsWith("@stud.noroff.no")) {
      setError("Email must be a valid stud.noroff.no email address.");
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);

        // Check if errorData is an array and extract the first error message if it exists
        if (Array.isArray(errorData) && errorData.length > 0) {
          throw new Error(errorData[0].message);
        } else {
          throw new Error(
            errorData.errors ? errorData.errors[0].message : response.statusText
          );
        }
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      setSuccess("Registration successful! You can now log in.");
    } catch (error) {
      console.error("Error registering user:", error);
      setError(error.message); // Update to display just the error message
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={9} lg={5}>
          <div
            className="p-4 rounded"
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#FFA100",
            }}
          >
            <div className="text-center mb-4">
              <img
                src="/HOLIDAZE Logo - BigCommerce Store Logo with Transparent Background.png" // Replace with your logo image path
                className="d-inline-block align-top img-fluid"
                alt="logo"
                style={{ width: "250px", height: "auto", marginLeft: "-2rem" }} // Adjust width and height as needed
              />
            </div>
            <h3 className="text-center mb-3 font-weight-bold text-white">
              Register
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
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
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
                Register
              </Button>
            </Form>
            <div className="text-center mt-3">
              <p className="text-white">Already have an account?</p>
              <Link to="/Login">
                <Button variant="link" className="text-white">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
