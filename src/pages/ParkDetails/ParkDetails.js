import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Row, Button, Container, Image } from "react-bootstrap";
import { selectParkById } from "../../store/parks/selectors";
import { fetchParks } from "../../store/parks/actions";

// import { newReview } from "../../store/parks/actions";

export default function ParkDetails() {
  const [reviewText, setReviewText] = useState();
  const params = useParams();
  const RecipeId = parseInt(params.id);
  const currentPark = useSelector(selectParkById(RecipeId));
  const dispatch = useDispatch();
  //const reviews= useSelector()
  function handleSubmit(e) {
    e.preventDefault();
    // setSubmitState(true)
    // dispatch(newReview())
  }

  useEffect(() => {
    dispatch(fetchParks());
  }, [dispatch]);

  return (
    <div className="parkDetails">
      <Container>
        <Row>
          Details
          {currentPark ? (
            currentPark.map((park) => {
              return (
                <div>
                  <h1>{park.title}</h1>
                  //stars rating here
                  <Image src={`${park.imageUrl}`} />
                  <p>{park.description}</p>
                </div>
              );
            })
          ) : (
            <p>Loading</p>
          )}
        </Row>
        <Row>Reviews</Row>
        <Row>
          <h1>Leave a review</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Leave a review</Form.Label>
              <Form.Control
                onChange={(e) => setReviewText(e.target.value)}
                type="text"
                name="review-text"
                value={reviewText}
                placeholder="nice park"
              />
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
