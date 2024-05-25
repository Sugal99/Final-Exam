import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";

const BASE_URL = "https://v2.api.noroff.dev"; // Base URL

const YourBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const userName = localStorage.getItem("userName");
      const apiKey = localStorage.getItem("apiKey");

      if (!accessToken || !userName) {
        setError("No access token or user name found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/holidaze/profiles/${userName}/bookings`,
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
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return <div>test</div>;
};

export default YourBookings;
