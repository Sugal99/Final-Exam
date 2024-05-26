import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      className="py-4 mt-4 fixed-relative"
      style={{ backgroundColor: "#FFA100" }}
    >
      <Container fluid>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={6}
            className="text-md-start text-center mb-3 mb-md-0"
          >
            <img
              src="/HOLIDAZE Logo - BigCommerce Store Logo with Transparent Background.png"
              className="d-inline-block align-top img-fluid"
              alt="Footer logo"
              style={{ maxWidth: "160px" }}
            />
          </Col>
          <Col xs={12} md={6} className="text-md-end text-center">
            <p className="mb-0 text-muted">
              &copy; 2023 HoliDaze Inc. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
