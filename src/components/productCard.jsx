// ProductCard.jsx
import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { getAllVenues } from "./services.jsx/api/VenuesApi";
import { truncateText } from "./utils/textUtils";

const ProductCard = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const { data } = await getAllVenues();
        console.log("Venues data:", data); // Log data to console
        setVenues(data); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <Row xs={1} md={2} lg={3} className="g-4 mt-5">
      {Array.isArray(venues) &&
        venues.map((venue) => (
          <Col key={venue.id}>
            <Card>
              <Card.Img
                variant="top"
                src={venue.media && venue.media[0] ? venue.media[0].url : ""}
              />
              <Card.Body style={{ position: "relative" }}>
                <Card.Text className="text-muted mb-0 position-absolute top-0 end-0 ml-3 p-1">
                  {venue.name}
                </Card.Text>
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>{truncateText(venue.description, 100)}</Card.Text>
                <Card.Text style={{ color: "green" }}>{venue.price}$</Card.Text>
                <Button
                  variant="primary"
                  style={{ backgroundColor: "#FFA100" }}
                >
                  View Venues
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default ProductCard;
