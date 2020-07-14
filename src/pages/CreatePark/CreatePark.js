import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";
import { addPark } from "../../store/parks/actions";

export default function CreatePark() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  //   const token = useSelector(selectToken);
  //   const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form input: ", title, description, imageUrl, country, type);
    dispatch(addPark(title, description, imageUrl, country, user));

    //reset form
    setTitle("");
    setDescription("");
    setImageUrl("");
    setCountry("");
    setType("");
  }

  //   useEffect(() => {
  //     if (token === null) {
  //       history.push("/");
  //     }
  //   }, [token, history]);

  return (
    <div>
      <Container>
        <h1>Add a park</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              name="title"
              value={title}
              placeholder="Enter title"
            />
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group controlId="formBasicImageUrl">
            <Form.Label>Image url</Form.Label>
            <Form.Control
              name="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="Enter image url"
            />
          </Form.Group>

          <Form.Group controlId="formBasicCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              placeholder="Enter country"
            />
          </Form.Group>

          <Form.Group
            onChange={(e) => {
              setType(e.target.value);
            }}
            controlId="formBasicCheckbox"
          >
            <Form.Label>Type</Form.Label>
            <Form.Check name="type" value="flat" type="radio" label="Flat" />
            <Form.Check
              name="type"
              value="mountain"
              type="radio"
              label="Mountain"
            />
            <Form.Check name="type" value="lake" type="radio" label="Lake" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
