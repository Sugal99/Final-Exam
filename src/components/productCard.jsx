import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllVenues, searchVenues } from "../services.jsx/api/VenuesApi";
import { truncateText } from "./utils/textUtils";
import { StarFill } from "react-bootstrap-icons";
import SearchBar from "./searchbar"; // Import the SearchBar component

const fallBackImage = "/placeholder.gif";
const fallBackAvatar = "/placeholder.gif";

const ProductCard = () => {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Fetching venues...");
    const fetchVenues = async () => {
      try {
        let response;
        if (searchTerm.trim() === "") {
          // Pass false for includeOwner to exclude owner information
          response = await getAllVenues(true);
        } else {
          // Pass true for includeOwner to include owner information
          response = await searchVenues(searchTerm, true);
        }

        console.log("Venues data before sorting:", response.data);

        if (Array.isArray(response.data)) {
          const sortedData = response.data.sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          );

          console.log("Venues data after sorting:", sortedData);

          setVenues(sortedData);
        } else {
          console.error("Venues data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, [searchTerm]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallBackImage;
  };

  const handleAvatarError = (e) => {
    e.target.onerror = null;
    e.target.src = fallBackAvatar;
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <SearchBar handleInputChange={handleInputChange} />{" "}
      {/* Pass handleInputChange function */}
      {venues.length === 0 && (
        <div className="text-center my-3">
          <p>No venues found, sorry!</p>
        </div>
      )}
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {venues.map((venue) => (
          <Col key={venue.id}>
            <Link to={`/SingleVenuePages/${venue.id}`} className="card-link">
              <Card className="h-100 position-relative">
                <div>
                  <Card.Img
                    variant="top"
                    src={
                      venue.media && venue.media[0]
                        ? venue.media[0].url
                        : fallBackImage
                    }
                    onError={handleImageError}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    {venue.owner && venue.owner.avatar && (
                      <img
                        src={
                          venue.owner.avatar.url
                            ? venue.owner.avatar.url
                            : fallBackAvatar
                        }
                        alt={
                          venue.owner.avatar.alt
                            ? venue.owner.avatar.alt
                            : "Avatar"
                        }
                        onError={handleAvatarError}
                        className="rounded-circle me-2"
                        style={{ width: "30px", height: "30px" }}
                      />
                    )}
                    {venue.owner && (
                      <Card.Text className="text-muted">
                        {venue.owner.name}
                      </Card.Text>
                    )}
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
                  <Card.Text style={{ color: "green" }}>
                    ${venue.price}
                  </Card.Text>
                  <Button
                    variant="primary"
                    style={{
                      backgroundColor: "#FFA100",
                      maxWidth: "135px",
                    }}
                  >
                    View Venue
                  </Button>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductCard;
