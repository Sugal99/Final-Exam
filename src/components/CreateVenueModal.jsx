import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createVenue } from "../services.jsx/api/VenuesApi"; // Adjust the import path as needed

const CreateVenueModal = ({ show, handleClose }) => {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: [], // Ensure media is an array
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("media")) {
      const [_, index, field] = name.split("-");
      const updatedMedia = [...venueData.media];
      updatedMedia[index][field] = value;
      setVenueData((prevData) => ({
        ...prevData,
        media: updatedMedia,
      }));
    } else if (name in venueData.meta) {
      setVenueData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (name in venueData.location) {
      setVenueData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [name]: value,
        },
      }));
    } else {
      setVenueData((prevData) => ({
        ...prevData,
        [name]: type === "number" ? +value : value,
      }));
    }
  };

  const handleAddMedia = () => {
    setVenueData((prevData) => ({
      ...prevData,
      media: [...prevData.media, { url: "", alt: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const data = await createVenue(venueData);
        console.log("Venue created:", data);
        setSuccessMessage("Venue created successfully!");
        // Remove the line below to prevent the modal from closing automatically
        // handleClose(); // Close the modal on successful creation
      } catch (error) {
        console.error("Error creating venue:", error);
      }
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Venue</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            <Form.Control.Feedback type="invalid">
              Please provide a venue name.
            </Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">
              Please provide a venue description.
            </Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">
              Please provide a price.
            </Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">
              Please provide the maximum number of guests.
            </Form.Control.Feedback>
          </Form.Group>

          {venueData.media.map((mediaItem, index) => (
            <div key={index}>
              <Form.Group controlId={`formMediaUrl-${index}`} className="mt-3">
                <Form.Label>Media URL (optional)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter media URL"
                  name={`media-${index}-url`}
                  value={mediaItem.url}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          ))}
          <Button variant="secondary" onClick={handleAddMedia} className="mt-3">
            Add Media
          </Button>

          <Form.Group controlId="formMetaWifi" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Wifi (optional)"
              name="wifi"
              checked={venueData.meta.wifi}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formMetaParking" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Parking (optional)"
              name="parking"
              checked={venueData.meta.parking}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formMetaBreakfast" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Breakfast (optional)"
              name="breakfast"
              checked={venueData.meta.breakfast}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formMetaPets" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Pets (optional)"
              name="pets"
              checked={venueData.meta.pets}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Address (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={venueData.location.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCity" className="mt-3">
            <Form.Label>City (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={venueData.location.city}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formZip" className="mt-3">
            <Form.Label>Zip Code (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zip code"
              name="zip"
              value={venueData.location.zip}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCountry" className="mt-3">
            <Form.Label>Country (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              name="country"
              value={venueData.location.country}
              onChange={handleChange}
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
          {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {successMessage}
            </div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateVenueModal;
