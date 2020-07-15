import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom"


export default function PreviewCard(props) {

    const meanRating = () => {
        let rating = 0
        props.reviews.forEach(review => {
            rating += review.stars //maybe parseInt??
        })
        rating = Math.floor(rating / props.reviews.length)
        const star = "★"
        return star.repeat(rating)
    }

    return (
        <Link
            to={`/park/${props.id}`}
        >
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.imageUrl} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text> {props.decription} <br />
                        {meanRating()}
                    </Card.Text>

                </Card.Body>
            </Card>
        </Link>
    )
}
