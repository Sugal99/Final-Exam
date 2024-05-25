import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import BookingCard from "../components/BookingsCard"; // Importing BookingCard component

const BASE_URL = "https://v2.api.noroff.dev";

const YourBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const apiKey = localStorage.getItem("apiKey");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!accessToken || !userName) {
        setError("No access token or user name found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/holidaze/profiles/${userName}/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings data");
        }

        const data = await response.json();
        console.log("Bookings Data:", data);

        setBookings(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [accessToken, userName, apiKey]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 ">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-center">Your Bookings </h2>
          <p className="text-center">
            You currently have {bookings.length} upcoming bookings
          </p>
          <hr />
          {bookings.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4 mt-2">
              {bookings.map((booking, index) => (
                <Col key={index}>
                  <BookingCard booking={booking} />
                </Col>
              ))}
            </Row>
          ) : (
            <p>You have no upcoming bookings.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default YourBookings;
