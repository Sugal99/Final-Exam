import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { getAllVenues } from "./services.jsx/api/VenuesApi";
import { truncateText } from "./utils/textUtils";

const ProductCard = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const { data } = await getAllVenues(true); // Include _owner
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
            <Card className="h-100">
              <div>
                <Card.Img
                  variant="top"
                  src={venue.media && venue.media[0] ? venue.media[0].url : ""}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
              <Card.Body className="position-relative">
                <div className="d-flex align-items-center mb-3">
                  {venue.owner.avatar && (
                    <img
                      src={venue.owner.avatar.url}
                      alt={venue.owner.avatar.alt}
                      className="rounded-circle me-2"
                      style={{ width: "30px", height: "30px" }}
                    />
                  )}
                  <Card.Text className="text-muted">
                    {venue.owner.name}
                  </Card.Text>
                </div>
                <Card.Title>{truncateText(venue.name, 22)}</Card.Title>
                <Card.Text>
                  {venue.description
                    ? truncateText(venue.description, 40)
                    : "No description available yet!"}
                </Card.Text>
                <Card.Text style={{ color: "green" }}>${venue.price}</Card.Text>
                <Button
                  variant="primary"
                  style={{
                    backgroundColor: "#FFA100",
                    marginTop: "auto",
                    maxWidth: "135px",
                  }}
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
