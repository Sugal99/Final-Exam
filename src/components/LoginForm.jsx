import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const LoginForm = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          {/* Yellow square container */}
          <div
            className="p-4 rounded"
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#FFA100",
            }}
          >
            <div className="text-center mb-4  ">
              {/* Logo */}
              <img
                src="/HOLIDAZE Logo - BigCommerce Store Logo with Transparent Background.png" // Replace with your logo image path
                className="d-inline-block align-top img-fluid  "
                alt="logo"
                style={{ maxWidth: "172px" }}
              />
            </div>
            <h3 className="text-center mb-3 font-weight-bold text-white ">
              Sign up
            </h3>
            <Form>
              {/* Email Input */}
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              {/* Password Input */}
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              {/* Login Button */}
              <Button variant="warning" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
