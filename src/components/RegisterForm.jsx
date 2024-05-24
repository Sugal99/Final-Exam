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

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.name)) {
      newErrors.name =
        "Name can only contain letters, numbers, and underscores.";
    } else if (formData.name.length > 20) {
      newErrors.name = "Name cannot be greater than 20 characters.";
    }

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
                src="/HOLIDAZE Logo - BigCommerce Store Logo with Transparent Background.png" // Replace with your logo image path
                className="d-inline-block align-top img-fluid"
                alt="logo"
                style={{ width: "250px", height: "auto", marginLeft: "-2rem" }} // Adjust width and height as needed
              />
            </div>
            <h3 className="text-center mb-3 font-weight-bold text-white">
              Register
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
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
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
