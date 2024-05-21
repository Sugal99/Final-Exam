import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Carousel,
  Accordion,
  Button,
  Form,
} from "react-bootstrap";
import { getVenueById } from "../services.jsx/api/VenuesApi";
import { StarFill } from "react-bootstrap-icons";
import { createBooking } from "../services.jsx/api/BookingsApi"; // Import createBooking function

import InformationAccordion from "../components/InformationAccordion.jsx";
import LocationAccordion from "../components/LocationAccordion.jsx";
import MetaAccordion from "../components/MetaAccordion.jsx";

// Fallback images
const fallBackImage = "/placeholder.gif";
const fallBackAvatar = "/placeholder.gif";

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = fallBackImage;
};

const handleAvatarError = (e) => {
  e.target.onerror = null;
  e.target.src = fallBackAvatar;
};

const SingleVenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);
  const [guests, setGuests] = useState(1);
  const [startDate, setStartDate] = useState(""); // State to hold start date
  const [endDate, setEndDate] = useState(""); // State to hold end date

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const { data } = await getVenueById(id);
        console.log("Fetched Venue Data:", data);
        setVenue(data);
      } catch (error) {
        console.error("Error fetching venue:", error);
        setError(error.message);
      }
    };

    fetchVenue();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!venue) {
    return <div>Loading...</div>;
  }

  const handleGuestChange = (amount) => {
    setGuests((prev) => Math.max(1, prev + amount));
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleBooking = async () => {
    try {
      // Prepare booking object
      const booking = {
        venueId: id,
        startDate,
        endDate,
        guests,
      };

      // Send request to create booking
      const createdBooking = await createBooking(booking);
      console.log("Booking created:", createdBooking);

      // Clear form fields after successful booking
      setStartDate("");
      setEndDate("");
      setGuests(1);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <Container className="mt-1">
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center mb-2 position-relative">
          <div
            className="d-flex align-items-center justify-content-between position-absolute mt-5"
            style={{ width: "calc(100% - 2rem)" }}
          >
            <div className="d-flex align-items-center">
              {venue.owner?.avatar && (
                <img
                  src={venue.owner.avatar.url}
                  alt={venue.owner.avatar.alt}
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  onError={handleAvatarError}
                />
              )}
              <span className="text-dark bg-light px-2 py-1 rounded">
                {venue.owner?.name}
              </span>
            </div>
            <div className="py-1" style={{ marginLeft: "1rem" }}>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <StarFill
                    key={index}
                    className={
                      index < venue.rating
                        ? "text-warning me-1"
                        : "text-muted me-1"
                    }
                  />
                ))}
            </div>
          </div>
          <h2>{venue.name}</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8}>
          <Carousel fade>
            {venue.media && venue.media.length > 0 ? (
              venue.media.map((image, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex justify-content-center">
                    <img
                      className="d-block w-100 img-fluid rounded"
                      src={image.url || fallBackImage}
                      alt={image.alt || venue.name}
                      onError={handleImageError}
                      style={{ height: "500px", objectFit: "cover" }}
                    />
                  </div>
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <div className="d-flex justify-content-center">
                  <img
                    className="d-block w-100 img-fluid rounded"
                    src={fallBackImage}
                    alt="Not available"
                    onError={handleImageError}
                    style={{ height: "500px", objectFit: "cover" }}
                  />
                </div>
              </Carousel.Item>
            )}
          </Carousel>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={8}>
          <Accordion defaultActiveKey="0">
            <InformationAccordion
              description={venue.description}
              price={venue.price}
              maxGuests={venue.maxGuests}
            />
            <LocationAccordion location={venue.location} />
            <MetaAccordion meta={venue.meta} />
          </Accordion>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={8}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Choose Start Date"
                className="text-muted"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Choose End Date"
                className="text-muted"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Guests</Form.Label>
              <div className="d-flex align-items-center">
                <Button
                  onClick={() => handleGuestChange(-1)}
                  style={{ backgroundColor: "#FFA100" }}
                  className="rounded-pill"
                >
                  -
                </Button>
                <span className="mx-2">{guests}</span>
                <Button
                  onClick={() => handleGuestChange(1)}
                  style={{ backgroundColor: "#FFA100" }}
                  className="rounded-pill"
                >
                  +
                </Button>
              </div>
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              style={{ backgroundColor: "#FFA100" }}
              onClick={handleBooking} // Handle booking button click
            >
              Book Now
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleVenuePage;
