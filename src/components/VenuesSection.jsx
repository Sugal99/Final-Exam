import React, { forwardRef } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./productCard";

const VenuesSection = forwardRef((props, ref) => {
  return (
    <Row ref={ref} className="mt-5 pt-5  ">
      <Col className="text-center">
        <h3 className="fw-bold fs-5">Venues</h3>
        <h4 className="fs-5">Find Your Perfect Holiday Venue</h4>
      </Col>
      <ProductCard />
    </Row>
  );
});

export default VenuesSection;
