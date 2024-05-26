import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card, ListGroup } from "react-bootstrap";
import CreateVenueModal from "../components/CreateVenueModal";
import UpdateVenueModal from "../components/UpdateVenueModal";
import { getVenuesByProfile, deleteVenue } from "../services.jsx/api/VenuesApi";
import { StarFill } from "react-bootstrap-icons";
import { truncateText } from "../components/utils/textUtils";
import { useNavigate } from "react-router-dom";

const YourVenues = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for showing the update modal
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null); // State for storing the selected venue
  const [showRefreshMessage, setShowRefreshMessage] = useState(false);
  const [bookings, setBookings] = useState({}); // State for storing venue bookings count

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  const fallBackImage = "/placeholder.gif";

  const profileName = localStorage.getItem("userName");

  const handleUpdateVenue = (venue) => {
    setSelectedVenue(venue); // Set the selected venue for updating
    setShowUpdateModal(true); // Show the update modal
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false); // Close the update modal
    setSelectedVenue(null); // Reset the selected venue
  };

  const handleViewVenue = (venue) => {
    navigate(`/SingleVenuePages/${venue.id}`);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallBackImage;
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDeleteVenue = async (venueId) => {
    try {
      const deleted = await deleteVenue(venueId, accessToken, apiKey);
      if (deleted) {
        // Venue deleted successfully, set showRefreshMessage to true
        setShowRefreshMessage(true);
      } else {
        // Failed to delete venue
        console.log("Failed to delete venue");
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venuesResponse = await getVenuesByProfile(
          profileName,
          accessToken,
          apiKey
        );
        setVenues(venuesResponse.data);

        const bookingsPromises = venuesResponse.data.map(
          (venue) => ([venue.id], accessToken, apiKey)
        );
        const bookingsResponses = await Promise.all(bookingsPromises);
        const bookingsData = {};
        venuesResponse.data.forEach((venue, index) => {
          bookingsData[venue.id] = bookingsResponses[index];
        });
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [profileName, accessToken, apiKey]); // Removed 'bookings' from dependency array

  return (
    <Container className="mt-5">
      <UpdateVenueModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        venue={selectedVenue} // Pass the selected venue to the UpdateVenueModal component
      />
      <Row>
        {showRefreshMessage && (
          <div className="alert alert-info mt-3" role="alert">
            Venue deleted successfully. Please refresh the page.
          </div>
        )}
        <Col className="text-center">
          <h2>Your Venues</h2>
          <Button
            variant="primary"
            onClick={handleShow}
            className="mt-3"
            style={{ backgroundColor: "#FFA100" }}
          >
            Create Venues
          </Button>
          <hr className="mt-3" />
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {venues.map((venue) => (
          <Col key={venue.id}>
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button
                    variant="outline-success"
                    onClick={() => handleUpdateVenue(venue)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDeleteVenue(venue.id)}
                  >
                    Delete
                  </Button>
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
                  onClick={() => handleViewVenue(venue)}
                >
                  View Venue
                </Button>
                {/* Bookings for the venue */}
                <ListGroup className="mt-3">
                  <ListGroup.Item>
                    <strong>Bookings:</strong>{" "}
                    {bookings[venue.id] ? bookings[venue.id].length : 0}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <CreateVenueModal show={showModal} handleClose={handleClose} />
    </Container>
  );
};

export default YourVenues;
