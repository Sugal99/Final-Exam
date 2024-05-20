import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Carousel, Accordion } from "react-bootstrap";
import { getVenueById } from "../services.jsx/api/VenuesApi";
import { StarFill } from "react-bootstrap-icons";

import InformationAccordion from "../components/InformationAccordion.jsx";
import LocationAccordion from "../components/LocationAccordion.jsx";
import MetaAccordion from "../components/MetaAccordion.jsx";

// Fallback images
const fallBackImage = "/placeholder.gif";
const fallBackAvatar = "/placeholder.gif";

const SingleVenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);

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
                />
              )}
              <span className="text-dark bg-light px-2 py-1 rounded">
                {venue.owner.name}
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
          <h2 className="">{venue.name}</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8}>
          <Carousel fade>
            {venue.media && venue.media.length > 0 ? (
              venue.media.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 rounded"
                    src={image.url || fallBackImage}
                    alt={venue.name}
                  />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded"
                  src={fallBackImage}
                  alt="Not available"
                />
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
              fallBackImage={fallBackImage}
              fallBackAvatar={fallBackAvatar}
            />
            <LocationAccordion
              location={venue.location}
              fallBackImage={fallBackImage}
              fallBackAvatar={fallBackAvatar}
            />
            <MetaAccordion
              meta={venue.meta}
              fallBackImage={fallBackImage}
              fallBackAvatar={fallBackAvatar}
            />
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleVenuePage;
