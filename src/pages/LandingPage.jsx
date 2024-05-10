import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import SearchBar from "../components/searchbar.jsx";
import ProductCard from "../components/productCard";

const LandingPage = () => {
  return (
    <Container className="d-flex flex-column min-vh-100">
      {/* Landing Page Mobile layout */}
      <Row className="justify-content-center align-items-center d-md-none mt-4">
        <Col xs={11} sm={8}>
          <Image src="/Group2.png" alt="Holiday Venue" fluid rounded />
        </Col>
      </Row>
      <Row className="justify-content-center d-md-none">
        <Col xs={11} sm={8} className="text-center">
          <h2 className="fw-bold text-wrap fs-4">
            Find Your Perfect Holiday <br /> Venue with Holidaze!
          </h2>
          <p className="text-muted text-wrap fs-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed
            massa blandit, faucibus quam sed, feugiat massa.
          </p>
          <Button
            className="rounded-pill"
            style={{ backgroundColor: "#FFA100" }}
          >
            View Venues
          </Button>
        </Col>
      </Row>

      {/* Landing Page Desktop layout */}
      <Row className="py-5 justify-content-center align-items-center d-none d-md-flex">
        <Col md={6} lg={6} className="text-md-right">
          <h2 className="fw-bold text-wrap fs-1">
            Find Your
            <br /> Perfect Holiday <br /> Venue with Holidaze!
          </h2>
          <p className="text-muted text-wrap fs-6">
            Lorem ipsum dolor sit amet, consectetur <br />
            adipiscing elit. Integer sed massa blandit,
            <br /> faucibus quam sed, feugiat massa.
          </p>
          <Button
            className="rounded-pill"
            style={{ backgroundColor: "#FFA100" }}
          >
            View Venues
          </Button>
        </Col>
        <Col md={6} className="text-md-left">
          <Image
            src="/Group2.png"
            alt="Holiday Venue"
            fluid
            rounded
            style={{ maxWidth: "90%" }}
            className="ml-md-5"
          />
        </Col>
      </Row>

      {/* Venues section */}
      <Row className="mt-auto">
        <Col className="text-center">
          <h3 className="fw-bold fs-5">Venues</h3>
          <h4 className="fs-5">Find Your Perfect Holiday Venue</h4>
          <SearchBar />
        </Col>
      </Row>
      <ProductCard />
    </Container>
  );
};

export default LandingPage;
