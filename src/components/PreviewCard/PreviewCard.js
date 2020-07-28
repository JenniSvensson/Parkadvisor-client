import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./PreviewCard.css";

//redux store
import { fetchLikes } from "../../store/likes/actions";
import { selectLikes } from "../../store/likes/selectors";

export default function PreviewCard(props) {
  const dispatch = useDispatch();
  const likes = useSelector(selectLikes);

  useEffect(() => {
    dispatch(fetchLikes());
  }, [dispatch]);

  //calculate rating
  const meanRating = () => {
    let rating = 0;
    props.reviews.forEach((review) => {
      rating += review.stars;
    });
    rating = Math.floor(rating / props.reviews.length);
    const star = "★";
    return star.repeat(rating);
  };

  //count likes by park
  let likesNr = 0;
  const countLikes = (id) => {
    if (likes) {
      const likesByPark = likes.filter((like) => like.parkId === id);
      if (likesByPark) {
        likesByPark.forEach((like) => likesNr++);
      }
    }
  };

  return (
    <Card
      //border="succes"
      style={{
        width: "25rem",
        height: "25rem",
        overflow: "hidden",
      }}
    >
      <Card.Img
        variant="top"
        src={props.imageUrl}
        style={{
          height: "15rem",
          overflow: "hidden",
        }}
      />{" "}
      <Card.Body>
        <Link to={`/park/${props.id}`}>
          <Card.Title>{props.title} </Card.Title>
        </Link>

        <Card.Subtitle className="mb-2 text-muted">
          <span className="stars" role="img" aria-label="heart">
            {countLikes(props.id)} 💚 {likesNr}
          </span>
          <span className="rating">{meanRating()}</span>
        </Card.Subtitle>
        <Card.Text>
          {props.description} <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
