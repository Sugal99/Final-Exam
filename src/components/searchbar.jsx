import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = () => {
  return (
    <Form className="text-center mt-1 d-flex justify-content-center align-item-center w-100">
      <Form.Group controlId="formSearch" className="mb-0">
        <Form.Control type="text" placeholder="Search" className="mx-auto " />
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
