import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  Form,
  Col,
  Row,
  Button,
  Container,
  Image,
} from "react-bootstrap";
import { selectParkById } from "../../store/parks/selectors";
import { fetchParks, reportPark } from "../../store/parks/actions";
import {
  newReview,
  fetchReviews,
  updateReview,
} from "../../store/reviews/actions";
import {
  selectReviewsById,
} from "../../store/reviews/selectors";
import { CloudinaryContext } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "../../config/CloudinaryService";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { selectToken, selectUser } from "../../store/user/selectors";
import { selectLikes } from "../../store/likes/selectors";
import { toggleLike } from "../../store/likes/actions";

import "./ParkDetails.css";

export default function ParkDetails() {
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [stars, setStars] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [descriptionUpdate, setDescriptionUpdate] = useState();
  const [nameUpdate, setNameUpdate] = useState();
  const [starsUpdate, setStarsUpdate] = useState();
  const [imageUrlUpdate, setImageUrlUpdate] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [reported, setReported] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  //const reviews = useSelector(selectReviews);
  const currentPark = useSelector(selectParkById(id));
  const currentReviews = useSelector(selectReviewsById(id));
  const user = useSelector(selectUser);
  const likes = useSelector(selectLikes);


  function handleSubmit(e) {
    e.preventDefault();
    dispatch(newReview(description, name, stars, id, imageUrl));
    //reset form
    setDescription("");
    setName("");
    setImageUrl("");
    setSubmitted(true);
  }

  function handleSubmitUpdate(e) {
    e.preventDefault();
    dispatch(
      updateReview(
        descriptionUpdate,
        nameUpdate,
        starsUpdate,
        reviewId,
        imageUrlUpdate
      )
    );
    setSubmitted(true);
    setShowForm(false);
  }

  const meanRating = () => {
    let rating = 0;
    currentPark.reviews.forEach((review) => {
      rating += review.stars;
    });
    rating = Math.floor(rating / currentPark.reviews.length);
    const star = "★";
    return star.repeat(rating);
  };

  useEffect(() => {
    dispatch(fetchParks());
    dispatch(fetchReviews(id));
    fetchPhotos("image", setImageUrl);

    // eslint-disable-next-line
  }, [dispatch]);

  //upload picture
  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "parkadvisor",
      tags: [tag],
      uploadPreset: "upload",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          setImageUrl(photos.info.url);
        }
      } else {
        console.log(error);
        dispatch(showMessageWithTimeout("danger", true, error.message));
      }
    });
  };

  const beginUploadUpdate = (tag) => {
    const uploadOptions = {
      cloudName: "parkadvisor",
      tags: [tag],
      uploadPreset: "upload",
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if (photos.event === "success") {
          setImageUrlUpdate(photos.info.url);
        }
      } else {
        console.log(error);
        dispatch(showMessageWithTimeout("danger", true, error.message));
      }
    });
  };

  function report() {
    dispatch(reportPark(id));
    setReported(true);
  }

  function update(id, name, stars, description, imageUrl) {
    setReviewId(id);
    setNameUpdate(name);
    setStarsUpdate(stars);
    setDescriptionUpdate(description);
    setImageUrlUpdate(imageUrl);
    setShowForm(true);
  }

  const submittedEarlier = () => {
    let x = false;
    currentReviews.forEach((review) => {
      if (review.userId === user.id && user.id > 4) {
        console.log("You already submitted a review");
        x = true;
      }
    });
    return x;
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
    <div className="parkDetails">
      <Container>
        {currentPark ? (
          <div>
            <h1>
              {currentPark.title}
              {"  "}
              {meanRating()}
            </h1>
            <Row>
              <Image
                src={`${currentPark.image}`}
                className="image col-8"
                fluid
              />
              <div className="col-4">
                <p> {currentPark.description}</p>
                {token && (
                  <Button
                    onClick={handlerClick}
                    value={id}
                    variant="outline-primary"
                  >
                    {likesByUser
                      ? likesByUser.find((like) => like.parkId === parseInt(id))
                        ? "♥"
                        : "♡"
                      : null}
                  </Button>
                )}
                <Button onClick={report} disabled={reported}>
                  Report
                </Button>
              </div>
            </Row>
          </div>
        ) : (
            <p>Loading</p>
          )}

        <Row>
          {token && !submitted && !submittedEarlier() ? (
            <Form onSubmit={handleSubmit}>
              <CloudinaryContext cloudName="parkadvisor">
                <h2 className="mt-3 mb-2">Leave a review</h2>
                <Form.Group controlId="formBasicname">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Enter title"
                  />
                </Form.Group>

                <Form.Group
                  onChange={(e) => setStars(e.target.value)}
                  controlId="formBasicStars"
                >
                  <Form.Label>Add a rating</Form.Label>
                  <Form.Check name="stars" value="1" type="radio" label="1" />
                  <Form.Check name="stars" value="2" type="radio" label="2" />
                  <Form.Check name="stars" value="3" type="radio" label="3" />
                  <Form.Check name="stars" value="4" type="radio" label="4" />
                  <Form.Check name="stars" value="5" type="radio" label="5" />
                </Form.Group>

                <Form.Group controlId="formBasicComment">
                  <Form.Label>Leave a comment</Form.Label>
                  <Form.Control
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="review-text"
                    value={description}
                    placeholder="Enter comment"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicImageUrl">
                  <Form.Label>Image (1)</Form.Label>
                  <Row>
                    <Button onClick={() => beginUpload()}>Upload Image</Button>
                  </Row>
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      className="img-responsive"
                      style={{
                        maxHeight: "25vh",
                        maxWidth: "35vw",
                        padding: "10px 0",
                      }}
                    />
                  )}
                </Form.Group>
                <Button type="submit" value="submit">
                  Submit
                </Button>
              </CloudinaryContext>
            </Form>
          ) : !token ? (
            "Log in to post review"
          ) : (
                "You submitted a review for this park"
              )}
        </Row>
        <Col>
          <h1>Reviews({currentReviews.length})</h1>
          {currentReviews.map((review) => {
            return (
              <div key={review.id}>
                {review.userId === user.id && (
                  <Button
                    onClick={() => {
                      update(
                        review.id,
                        review.name,
                        review.stars,
                        review.description,
                        review.imageUrl
                      );
                    }}
                  >
                    Edit review
                  </Button>
                )}

                <h2>{review.name}</h2>
                {review.imageUrl && (
                  <Image
                    src={review.imageUrl}
                    className="img-responsive"
                    style={{
                      maxHeight: "25vh",
                      maxWidth: "35vw",
                      padding: "10px 0",
                    }}
                  />
                )}
                <h5>
                  By {review.userName} on{" "}
                  {moment(review.updatedAt).format("DD-MM-YYYY")}
                </h5>
                {"★".repeat(review.stars)}
                <p>{review.description}</p>
              </div>
            );
          })}
        </Col>
        {showForm && (
          <Form onSubmit={handleSubmitUpdate}>
            <CloudinaryContext cloudName="parkadvisor">
              <Form.Group controlId="formBasicname">
                <Form.Label>name</Form.Label>
                <Form.Control
                  onChange={(e) => setNameUpdate(e.target.value)}
                  type="text"
                  name="name"
                  value={nameUpdate}
                  placeholder="Enter name"
                />
              </Form.Group>

              <Form.Group
                onChange={(e) => setStarsUpdate(e.target.value)}
                controlId="formBasicStars"
              >
                <Form.Label>Add a rating</Form.Label>
                <Form.Check name="stars" value="1" type="radio" label="1" />
                <Form.Check name="stars" value="2" type="radio" label="2" />
                <Form.Check name="stars" value="3" type="radio" label="3" />
                <Form.Check name="stars" value="4" type="radio" label="4" />
                <Form.Check name="stars" value="5" type="radio" label="5" />
              </Form.Group>

              <Form.Group controlId="formBasicComment">
                <Form.Label>Leave a review</Form.Label>
                <Form.Control
                  onChange={(e) => setDescriptionUpdate(e.target.value)}
                  type="text"
                  name="review-text"
                  value={descriptionUpdate}
                  placeholder="Enter comment"
                />
              </Form.Group>
              <Form.Group controlId="formBasicImageUrl">
                <Form.Label>Image (1)</Form.Label>
                <Row>
                  <Button onClick={() => beginUploadUpdate()}>
                    Upload Image
                  </Button>
                </Row>
                {imageUrlUpdate && (
                  <Image
                    src={imageUrlUpdate}
                    className="img-responsive"
                    style={{
                      maxHeight: "25vh",
                      maxWidth: "35vw",
                      padding: "10px 0",
                    }}
                  />
                )}
              </Form.Group>
              <Button type="submit" value="submit">
                Submit
              </Button>
            </CloudinaryContext>
          </Form>
        )}
      </Container>
    </div>
  );
}
