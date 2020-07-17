import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Image,
  Jumbotron,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CloudinaryContext } from "cloudinary-react";
import { useHistory } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";
import { addPark } from "../../store/parks/actions";
import { fetchPhotos, openUploadWidget } from "../../config/CloudinaryService";
import { showMessageWithTimeout } from "../../store/appState/actions";

export default function CreatePark() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    fetchPhotos("image", setImageUrl);
    if (token === null) {
      history.push("/");
    }
  }, [token, history]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description || !imageUrl || !country || !type) {
      dispatch(
        showMessageWithTimeout("danger", true, "Please fill out all the fields")
      );
    } else {
      dispatch(addPark(title, description, imageUrl, country, type));
    }

    //reset form
    setTitle("");
    setDescription("");
    setImageUrl("");
    setCountry("");
    setType("");
  }

  //upload pictures
  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "parkadvisor",
      tags: [tag],
      uploadPreset: "upload",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          setImageUrl(photos.info.url);
        }
      } else {
        console.log(error);
        dispatch(showMessageWithTimeout("danger", true, error.message));
      }
    });
  };

  return (
    <div>
      <Jumbotron>
        <Container>
          <h1>Add a park</h1>{" "}
        </Container>
      </Jumbotron>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-4">
          <CloudinaryContext cloudName="parkadvisor">
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
              <Form.Label>Image (1)</Form.Label>
              <Button
                onClick={() => beginUpload()}
                style={{ marginLeft: "10px" }}
              >
                Upload Image
              </Button>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  className="img-responsive"
                  style={{
                    maxHeight: "25vh",
                    maxWidth: "35vw",
                    padding: "10px 0",
                  }}
                />
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

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </CloudinaryContext>
        </Form>
      </Container>
    </div>
  );
}
