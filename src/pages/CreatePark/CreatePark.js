import React, { useEffect, useRef, useState, useCallback } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";
import { addPark } from "../../store/parks/actions";
import Webcam from "react-webcam";

export default function CreatePark() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [toggleCaptureImage, setToggleCaptureImage] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageUrl(imageSrc);
  }, [webcamRef, setImageUrl]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form input: ", title, description, imageUrl, country, type);
    dispatch(addPark(title, description, imageUrl, country, type));

    //reset form
    setTitle("");
    setDescription("");
    setImageUrl("");
    setCountry("");
    setType("");
    setToggleCaptureImage(false);
  }

  useEffect(() => {
    if (token === null) {
      history.push("/");
    }
  }, [token, history]);

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
            {/* <Form.Control
              name="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="Enter image url"
            /> */}

            {toggleCaptureImage ? (
              <>
                {" "}
                <Row>
                  {!imageUrl ? (
                    <Webcam
                      audio={false}
                      height={200}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      minScreenshotHeight={200}
                      minScreenshotWidth={200}
                    />
                  ) : (
                    <img src={imageUrl} />
                  )}
                </Row>
                <Row>
                  {!imageUrl && (
                    <Button onClick={capture}>Capture photo</Button>
                  )}
                </Row>
              </>
            ) : (
              <Row>
                {" "}
                <Button onClick={(e) => setToggleCaptureImage(true)}>
                  Capture photo
                </Button>{" "}
              </Row>
            )}
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
