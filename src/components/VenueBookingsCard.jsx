import React, { useEffect, useState } from "react";
import { getBookingsForManagedVenues } from "../services.jsx/api/VenuesApi"; // Adjust the import path as needed
import { Card, ListGroup, Spinner, Alert } from "react-bootstrap";

const VenueBookingsCard = ({ venue, authToken }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getBookingsForManagedVenues(
          [venue.id],
          accessToken,
          apiKey
        );
        setBookings(bookingsData);
      } catch (error) {
        setError("Error fetching bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [venue.id]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{venue.name}</Card.Title>
        <Card.Text>{venue.description}</Card.Text>
        {bookings.length === 0 ? (
          <p>No bookings found for this venue.</p>
        ) : (
          <ListGroup variant="flush">
            {bookings.map((booking) => (
              <ListGroup.Item key={booking.id}>
                <strong>Booking ID:</strong> {booking.id}
                <br />
                <strong>Created:</strong>{" "}
                {new Date(booking.createdAt).toLocaleDateString()}
                <br />
                <strong>From:</strong>{" "}
                {new Date(booking.checkIn).toLocaleDateString()}
                <br />
                <strong>To:</strong>{" "}
                {new Date(booking.checkO    ut).toLocaleDateString()}
                <br />
                <strong>Guests:</strong> {booking.guests}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default VenueBookingsCard;
