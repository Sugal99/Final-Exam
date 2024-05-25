import { Container, Row, Col } from "react-bootstrap";
const YourBookings = () => {
  return (
    <Container className="mt-5 text-center fw-bold ">
      <Row>
        <Col>
          <h2>Your Bookings</h2>
          <p>You currently have 3 upcoming bookings</p> <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default YourBookings;
