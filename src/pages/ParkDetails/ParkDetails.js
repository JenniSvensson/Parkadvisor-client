import React, { useState } from 'react'
import { Form, Row, Button, Container } from "react-bootstrap";

// import { useDispatch } from "react-redux";
// import { newReview } from "../../store/parks/actions";



export default function ParkDetails() {
    const [reviewText, setReviewText] = useState();


    function handleSubmit(e) {
        e.preventDefault();
        // setSubmitState(true)
        // dispatch(newReview())
    }

    return (
        <div className="parkDetails">
            <Container>
                <Row>
                    Details
                </Row>
                <Row>
                    Reviews
                </Row>
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
    )
}
