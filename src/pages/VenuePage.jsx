import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import CreateVenueModal from "../components/CreateVenueModal"; // Adjust the import path as needed

const YourVenues = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <h2>Your Venues</h2>
          <Button
            variant="primary"
            onClick={handleShow}
            className="mt-3"
            style={{ backgroundColor: "#FFA100" }}
          >
            Create Venues
          </Button>
          <hr className="mt-3" />
        </Col>
      </Row>

      <CreateVenueModal show={showModal} handleClose={handleClose} />
    </Container>
  );
};

export default YourVenues;
