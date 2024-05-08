import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

const LandingPage = () => {
  return (
    <>
      {/* Mobile layout */}
      <Container className="d-md-none">
        <Row className="justify-content-center ">
          <Col xs={11} sm={8}>
            <Image src="/Group2.png" alt="Holiday Venue" fluid rounded />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={11} sm={8} className="text-center">
            <h2 className="font-weight-bold text-wrap fs-4">
              Find Your Perfect Holiday <br /> Venue with Holidaze!
            </h2>
            <p className="text-muted text-wrap fs-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              sed massa blandit, faucibus quam sed, feugiat massa.
            </p>
            <Button
              className="rounded-pill"
              style={{ backgroundColor: "#FFA100" }}
            >
              View Venues
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Desktop layout */}
      <Container className="py-5 d-none d-md-block">
        <Row className="justify-content-center align-items-center">
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
      </Container>
    </>
  );
};

export default LandingPage;
