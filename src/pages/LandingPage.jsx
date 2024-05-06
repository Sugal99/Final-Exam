import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

const LandingPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={11} sm={8} md={6} className="text-center">
          <Image src="/Group2.png" alt="Holiday Venue" fluid rounded />
          <h2 className="mt-3 font-weight-bold text-wrap fs-4">
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
    </Container>
  );
};

export default LandingPage;
