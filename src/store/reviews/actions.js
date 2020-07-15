import axios from "axios";
import { selectUser } from "../user/selectors";
import { apiUrl } from "../../config/constants";
import { setMessage } from "../appState/actions";

export const newReview = (description, name, stars, parkId) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    //dispatch(appLoading())
    const response = await axios.post(
      `${apiUrl}/review`,
      {
        name,
        description,
        stars,
        parkId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    //dispatch(showMessageWithTimeout("succes", false, response.data.message, 3000));
    dispatch(reviewPostSucces(response.data.newPark));
  };
};
export const reviewPostSucces = (newReview) => ({
  type: "POST_REVIEW_SUCCES",
  payload: newReview,
});
//FETCH REVIEWS FOR A PARK
export const fetchReviews = (parkId) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/park/${parkId}/reviews`);
    console.log("Reviews:", response.data);
    dispatch(fetchReviewsSuccess(response.data));
  };
};
export const fetchReviewsSuccess = (reviews) => ({
  type: "FETCH_REVIEWS_SUCCESS",
  payload: reviews,
});
