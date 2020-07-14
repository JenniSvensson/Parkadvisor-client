import React from "react";
import { Form, Button, Container } from "react-bootstrap";

export default function CreatePark() {
  return (
    <div>
      <Container>
        <h1>Add a park</h1>
        <Form>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" />
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group controlId="formBasicImageUrl">
            <Form.Label>Image url</Form.Label>
            <Form.Control
              name="imageUrl"
              type="text"
              placeholder="Enter image url"
            />
          </Form.Group>

          <Form.Group controlId="formBasicCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              type="text"
              placeholder="Enter country"
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Label>Type</Form.Label>
            <Form.Check type="radio" label="" />
            <Form.Check type="radio" label="" />
            <Form.Check type="radio" label="" />
            <Form.Check type="radio" label="" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
