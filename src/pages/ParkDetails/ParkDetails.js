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

export default function ParkDetails() {
  const [reviewText, setReviewText] = useState();
  const [title, setTitle] = useState();
  const [stars, setStars] = useState(4);
  const { id } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const currentPark = useSelector(selectParkById(id));

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(newReview(reviewText, title, stars, id));
    //reset form
    setReviewText("");
    setTitle("");
  }

  useEffect(() => {
    dispatch(fetchParks());
    dispatch(fetchReviews(id));
  }, [dispatch]);

  return (
    <div className="parkDetails">
      <Container>
        <Row>
          {currentPark ? (
            <div>
              <h1>{currentPark.title}</h1>
              //stars rating here
              <Image src={`${currentPark.image}`} />
              <p>{currentPark.description}</p>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </Row>
        <Row>Reviews</Row>
        <Row>
          <Form onSubmit={handleSubmit}>
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
            <Button type="submit" value="submit">
              Submit
            </Button>
          </Form>
        </Row>
        <Col>
          <h1>Reviews({reviews.length})</h1>
          {reviews.map((review) => {
            return (
              <div key={review.id}>
                <h2>{review.name}</h2>
                <h5>{review.updatedAt}</h5>
                <p>{review.description}</p>
              </div>
            );
          })}
        </Col>
      </Container>
    </div>
  );
}
