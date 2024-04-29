import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#FFA100" }}>
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="your-logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Your logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end primary"
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
