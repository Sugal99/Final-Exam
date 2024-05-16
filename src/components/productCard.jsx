import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { getAllVenues } from "./services.jsx/api/VenuesApi";
import { truncateText } from "./utils/textUtils";
import { StarFill } from "react-bootstrap-icons";

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
            <Card className="h-100 position-relative">
              <div>
                <Card.Img
                  variant="top"
                  src={venue.media && venue.media[0] ? venue.media[0].url : ""}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
              <Card.Body>
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
                    ? truncateText(venue.description, 30)
                    : "No description available yet!"}
                </Card.Text>
                <div className="position-absolute bottom-0 end-0 m-3 py-1">
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
                <Card.Text style={{ color: "green" }}>${venue.price}</Card.Text>
                <Button
                  variant="primary"
                  style={{
                    backgroundColor: "#FFA100",
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
