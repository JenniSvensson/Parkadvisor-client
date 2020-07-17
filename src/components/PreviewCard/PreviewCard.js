import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './PreviewCard.css'

//redux store
import { fetchLikes, toggleLike } from "../../store/likes/actions";
import { selectLikes } from "../../store/likes/selectors";
import { selectToken, selectUser } from "../../store/user/selectors";
import { showMessageWithTimeout } from "../../store/appState/actions";

export default function PreviewCard(props) {
  const dispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

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

  //check likes of user logged in
  let likesByUser;
  if (likes && user) {
    likesByUser = likes.filter((like) => like.userId === user.id);
  }

  //add or remove like
  const handlerClick = (e) => {
    e.preventDefault();
    const parkId = parseInt(e.target.value);
    if (!token) {
      dispatch(showMessageWithTimeout("danger", true, "Something went wrong"));
    } else {
      const isLiked = likesByUser.find((like) => like.parkId === parkId);
      dispatch(toggleLike(parkId, isLiked));
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.imageUrl} />{" "}
      {token && (
        <Button
          onClick={handlerClick}
          value={props.id}
          variant="outline-primary"
        >
          {likesByUser
            ? likesByUser.find((like) => like.parkId === props.id)
              ? "♥"
              : "♡"
            : null}
        </Button>
      )}
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
