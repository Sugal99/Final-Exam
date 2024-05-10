import React from "react";
import { Card, Button, ListGroup, Row, Col } from "react-bootstrap";

const ProductCard = () => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4 mt-5">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src="/AdobeStock_325677709.jpeg" />
            <Card.Body>
              <Card.Title>Product Title</Card.Title>
              <Card.Text>This is a short description of the product.</Card.Text>
              <Card.Text style={{ color: "green" }}>100$</Card.Text>
              <Button variant="primary">View Venues</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductCard;
