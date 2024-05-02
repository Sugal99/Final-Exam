import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#FFA100" }}>
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src="/HOLIDAZE Logo - BigCommerce Store Logo with Transparent Background.png"
            className="d-inline-block align-top img-fluid "
            alt="Your logo"
            style={{ maxWidth: "160px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <Nav.Link href="#home" className="text-white">
              {" "}
              Home
            </Nav.Link>
            <Nav.Link href="#signin" className="text-white">
              Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
