import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom"

// const meanRating = () => 


export default function PreviewCard(props) {
    return (
        <Link
        // to={`/parks/${props.id}`}
        >
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.imageUrl} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text> {props.decription} <br />
                        {/* The stars can be displayed by multiplying star by the avarage rating */}
                        {/* {"★"} */}

                    </Card.Text>

                </Card.Body>
            </Card>
        </Link>
    )
}
