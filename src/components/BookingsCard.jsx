import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";
import { truncateText } from "./utils/textUtils";

const fallBackImage = "/placeholder.gif";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallBackImage;
  };

  const handleViewVenue = () => {
    navigate(`/SingleVenuePages/${booking.venue.id}`);
  };

  return (
    <Card className="h-100 position-relative">
      <div>
        <Card.Img
          variant="top"
          src={
            booking.venue.media && booking.venue.media[0]
              ? booking.venue.media[0].url
              : fallBackImage
          }
          onError={handleImageError}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
      </div>
      <Card.Body>
        <Card.Title>{truncateText(booking.venue.name, 22)}</Card.Title>
        <Card.Text>
          {booking.venue.description
            ? truncateText(booking.venue.description, 30)
            : "No description available yet!"}
        </Card.Text>
        <div className="position-absolute bottom-0 end-0 m-3 py-1">
          {Array(5)
            .fill()
            .map((_, index) => (
              <StarFill
                key={index}
                className={
                  index < booking.venue.rating
                    ? "text-warning me-1"
                    : "text-muted me-1"
                }
              />
            ))}
        </div>
        <Card.Text>
          <strong>From:</strong>{" "}
          {new Date(booking.dateFrom).toLocaleDateString()}
        </Card.Text>
        <Card.Text>
          <strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}
        </Card.Text>
        <Card.Text>
          <strong>Guests:</strong> {booking.guests}
        </Card.Text>
        <Button
          variant="primary"
          style={{
            backgroundColor: "#FFA100",
            maxWidth: "135px",
          }}
          onClick={handleViewVenue}
        >
          View Venue
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
