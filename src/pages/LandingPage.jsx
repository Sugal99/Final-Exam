import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

const LandingPage = () => {
  return (
    <Container className="py-5">
      {/* Mobile layout */}
      <Row className="justify-content-center align-items-center d-md-none">
        <Col xs={11} sm={8}>
          <Image src="/Group2.png" alt="Holiday Venue" fluid rounded />
        </Col>
        <Col xs={11} sm={8} className="text-center">
          <h2 className="font-weight-bold text-wrap fs-4">
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

      {/* Desktop layout */}
      <Row className="justify-content-center align-items-center d-none d-md-flex">
        <Col md={6} lg={6} className="text-md-right">
          <h2 className="font-weight-bold text-wrap fs-1">
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
        <Col md={6} className="text-md-left ml-lg-5">
          <Image
            src="/Group2.png"
            alt="Holiday Venue"
            fluid
            rounded
            style={{ maxWidth: "90%" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
