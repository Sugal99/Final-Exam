import React from "react";
import { Accordion } from "react-bootstrap";

const LocationAccordion = ({ location }) => {
  return (
    <Accordion.Item className="mb-3" eventKey="1">
      <Accordion.Header>Location</Accordion.Header>
      <Accordion.Body>
        <p>
          <strong>Address:</strong>{" "}
          {location?.address !== null &&
          location?.address !== undefined &&
          location?.address !== ""
            ? location.address
            : "Not Available"}
        </p>
        <p>
          <strong>Zip:</strong>{" "}
          {location?.zip !== null &&
          location?.zip !== undefined &&
          location?.zip !== ""
            ? location.zip
            : "Not Available"}
        </p>
        <p>
          <strong>City:</strong>{" "}
          {location?.city !== null &&
          location?.city !== undefined &&
          location?.city !== ""
            ? location.city
            : "Not Available"}
        </p>
        <p>
          <strong>Country:</strong>{" "}
          {location?.country !== null &&
          location?.country !== undefined &&
          location?.country !== ""
            ? location.country
            : "Not Available"}
        </p>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default LocationAccordion;
