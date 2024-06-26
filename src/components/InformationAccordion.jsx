import React from "react";
import { Accordion } from "react-bootstrap";
import { truncateText } from "./utils/textUtils";

const InformationAccordion = ({ description, price, maxGuests }) => {
  return (
    <Accordion.Item className="mb-3" eventKey="0">
      <Accordion.Header>Information</Accordion.Header>
      <Accordion.Body>
        <p>
          <strong>Description:</strong>{" "}
          {description !== null &&
          description !== undefined &&
          description !== ""
            ? truncateText(description, 50)
            : "No description available yet!"}
        </p>
        <p>
          <strong>Price:</strong>{" "}
          <span style={{ color: "green" }}>
            {price !== null && price !== undefined
              ? `$${price}`
              : "Not Available"}
          </span>
        </p>
        <p>
          <strong>Max Guests:</strong>{" "}
          {maxGuests !== null && maxGuests !== undefined
            ? maxGuests
            : "Not Available"}
        </p>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default InformationAccordion;
