// VenuesSection.jsx
import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchBar from "./searchbar";
import ProductCard from "./productCard";
const VenuesSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <Row style={{ marginTop: "51vw" }}>
      <Col className="text-center">
        <h3 className="fw-bold fs-5">Venues</h3>
        <h4 className="fs-5">Find Your Perfect Holiday Venue</h4>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Col>
      <ProductCard searchTerm={searchTerm} />
    </Row>
  );
};

export default VenuesSection;
