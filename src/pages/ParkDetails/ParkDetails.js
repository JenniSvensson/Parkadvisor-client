import React from 'react'
import { Form, Row, Button, Container } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { newReview } from "../../store/art/actions";



export default function ParkDetails() {

    function handleSubmit() {
        event.preventDefault();
        setSubmitState(true)
        dispatch(newReview())
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
                                onChange={(event) => setTitle(event.target.value)}
                                type="text"
                                name="title"
                                value={title}
                                placeholder="Enter title"
                            />
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        </div>
    )
}
