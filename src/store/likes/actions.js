import axios from "axios";
import { apiUrl } from "../../config/constants";
import { showMessageWithTimeout } from "../appState/actions";

//FETCH LIKES
export const fetchLikes = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/like`);
      dispatch(fetchLikesSuccess(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
export const fetchLikesSuccess = (likes) => ({
  type: "FETCH_LIKES_SUCCESS",
  payload: likes,
});

//ADD LIKE
export const toggleLike = (parkId, isLiked) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().user.token;

      if (!isLiked) {
        const res = await axios.post(
          `${apiUrl}/like/add`,
          { parkId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(newLike([res.data]));
      } else if (isLiked) {
        const res = await axios.delete(`${apiUrl}/like/remove/${isLiked.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(removeLIke(isLiked.id));
      } else {
        dispatch(
          showMessageWithTimeout(
            "danger",
            true,
            "Something went wrong with your fav"
          )
        );
      }
    } catch (e) {
      console.log("error", e.message);
      dispatch(showMessageWithTimeout("danger", true, "Something went wrong"));
    }
  };
};

export function newLike(payload) {
  return {
    type: "ADD_LIKE",
    payload,
  };
}

export function removeLIke(payload) {
  return {
    type: "REMOVE_LIKE",
    payload,
  };
}
