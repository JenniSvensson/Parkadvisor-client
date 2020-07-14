import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"

// const meanRating = () => 


export default function PreviewCard() {
    return (
        <Link
        // to={`/parks/${props.id}`}
        >
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/04/640/320/Yosemite-iStock.jpg?ve=1&tl=1" />
                <Card.Body>
                    <Card.Title>Park name</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content. <br />
                        The stars can be displayed by multiplying star by the avarage rating
                        {/* {<span></span> * meanRating} */}

                    </Card.Text>

                </Card.Body>
            </Card>
        </Link>
    )
}
