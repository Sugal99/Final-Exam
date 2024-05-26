import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createVenue } from "../services.jsx/api/VenuesApi"; // Adjust the import path as needed

const CreateVenueModal = ({ show, handleClose }) => {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setVenueData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? +value : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createVenue(venueData);
      console.log("Venue created:", data);
      handleClose(); // Close the modal on successful creation
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Venue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter venue name"
              name="name"
              value={venueData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter venue description"
              name="description"
              value={venueData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrice" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={venueData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formMaxGuests" className="mt-3">
            <Form.Label>Max Guests</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter maximum guests"
              name="maxGuests"
              value={venueData.maxGuests}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            style={{ backgroundColor: "#FFA100" }}
          >
            Create Venue
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateVenueModal;