import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Form,
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
  //const reviews= useSelector()
  // const parkId = parseInt(id)
  const currentPark = useSelector(selectParkById(id));
  console.log("this is the park", currentPark);

  // console.log(reviews);

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
              <Image src={`${currentPark.imageUrl}`} />
              <p>{currentPark.description}</p>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </Row>
        <Row>Reviews</Row>
        <Row>
          <h1>Reviews</h1>
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
      </Container>
    </div>
  );
}
