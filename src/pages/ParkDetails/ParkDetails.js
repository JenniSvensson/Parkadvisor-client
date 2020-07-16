import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Form,
  Col,
  Row,
  Button,
  Container,
  Image,
  PopoverTitle,
} from "react-bootstrap";
import { selectParkById } from "../../store/parks/selectors";
import { fetchParks } from "../../store/parks/actions";
import { newReview, fetchReviews } from "../../store/reviews/actions";
import { selectReviews } from "../../store/reviews/selectors";
import { CloudinaryContext } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "../../config/CloudinaryService";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { selectToken } from "../../store/user/selectors";

export default function ParkDetails() {
  const [reviewText, setReviewText] = useState();
  const [title, setTitle] = useState();
  const [stars, setStars] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const reviews = useSelector(selectReviews);
  const currentPark = useSelector(selectParkById(id));

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(newReview(reviewText, title, stars, id));
    //reset form
    setReviewText("");
    setTitle("");
  }

  const meanRating = () => {
    let rating = 0;
    currentPark.reviews.forEach((review) => {
      rating += review.stars;
    });
    rating = Math.floor(rating / currentPark.reviews.length);
    const star = "★";
    return star.repeat(rating);
  };

  useEffect(() => {
    dispatch(fetchParks());
    dispatch(fetchReviews(id));
    fetchPhotos("image", setImageUrl);
  }, [dispatch]);

  //upload picture
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
    <div className="parkDetails">
      <Container>
        <Row>
          {currentPark ? (
            <div>
              <h1>{currentPark.title}</h1>
              {meanRating()}
              <Image src={`${currentPark.image}`} className="image" fluid />
              <p>{currentPark.description}</p>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </Row>
        <Row>
          {token && (
            <Form onSubmit={handleSubmit}>
              <CloudinaryContext cloudName="parkadvisor">
                <Form.Group controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Enter title"
                  />
                </Form.Group>

                <Form.Group
                  onChange={(e) => setStars(e.target.value)}
                  controlId="formBasicStars"
                >
                  <Form.Label>Add a rating</Form.Label>
                  <Form.Check name="stars" value="1" type="radio" label="1" />
                  <Form.Check name="stars" value="2" type="radio" label="2" />
                  <Form.Check name="stars" value="3" type="radio" label="3" />
                  <Form.Check name="stars" value="4" type="radio" label="4" />
                  <Form.Check name="stars" value="5" type="radio" label="5" />
                </Form.Group>

                <Form.Group controlId="formBasicComment">
                  <Form.Label>Leave a review</Form.Label>
                  <Form.Control
                    onChange={(e) => setReviewText(e.target.value)}
                    type="text"
                    name="review-text"
                    value={reviewText}
                    placeholder="Enter comment"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicImageUrl">
                  <Form.Label>Image (1)</Form.Label>
                  <Row>
                    <Button onClick={() => beginUpload()}>Upload Image</Button>
                  </Row>
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
                <Button type="submit" value="submit">
                  Submit
                </Button>
              </CloudinaryContext>
            </Form>
          )}
        </Row>
        <Col>
          <h1>Reviews({reviews.length})</h1>
          {reviews.map((review) => {
            return (
              <div key={review.id}>
                <h2>{review.name}</h2>
                <h5>{review.updatedAt}</h5>
                {"★".repeat(review.stars)}
                <p>{review.description}</p>
              </div>
            );
          })}
        </Col>
      </Container>
    </div>
  );
}
