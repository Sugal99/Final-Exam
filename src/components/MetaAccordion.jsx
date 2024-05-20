import React from "react";
import { Accordion } from "react-bootstrap";

const MetaAccordion = ({ meta }) => {
  return (
    <Accordion.Item className="mb-3" eventKey="2">
      <Accordion.Header>Amenities</Accordion.Header>
      <Accordion.Body>
        <p>
          <strong>Wifi:</strong>{" "}
          <span style={{ color: meta.wifi ? "green" : "red" }}>
            {meta.wifi ? " Yes" : " No"}
          </span>
        </p>
        <p>
          <strong>Parking:</strong>{" "}
          <span style={{ color: meta.parking ? "green" : "red" }}>
            {meta.parking ? " Yes" : " No"}
          </span>
        </p>
        <p>
          <strong>Pets:</strong>{" "}
          <span style={{ color: meta.pets ? "green" : "red" }}>
            {meta.pets ? " Yes" : " No"}
          </span>
        </p>
        <p>
          <strong>Breakfast:</strong>{" "}
          <span style={{ color: meta.breakfast ? "green" : "red" }}>
            {meta.breakfast ? " Yes" : " No"}
          </span>
        </p>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default MetaAccordion;
