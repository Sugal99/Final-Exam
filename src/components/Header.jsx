import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear accessToken, apiKey, and venueManager from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("apiKey");
    localStorage.removeItem("venueManager");

    // Redirect to the login page
    navigate("/Login");
  };

  const isLoggedIn = localStorage.getItem("accessToken") !== null;
  const venueManager = localStorage.getItem("venueManager") === "true";

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#FFA100" }}>
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="/HOLIDAZE Logo - BigCommerce Store Logo with Transparent Background.png"
            className="d-inline-block align-top img-fluid"
            alt="Your logo"
            style={{ maxWidth: "160px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="ml-auto">
            <Nav.Link href="/" className="text-white">
              Home
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link href="#bookings" className="text-white">
                  Bookings
                </Nav.Link>
                {venueManager && (
                  <Nav.Link href="/venues" className="text-white">
                    Venues
                  </Nav.Link>
                )}
                <Nav.Link
                  href="#logout"
                  className="text-white"
                  onClick={handleLogout}
                >
                  Log out
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/Login" className="text-white">
                Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
