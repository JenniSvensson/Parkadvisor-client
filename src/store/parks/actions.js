import axios from "axios";
import { apiUrl } from "../../config/constants";
import { setMessage } from "../appState/actions";

export const fetchArtworks = () => {
  return async (dispatch, getState) => {
    const artCount = getState().art.length;
    const response = await axios.get(
      `${apiUrl}/parks?limit=10&offset=${artCount}`
    );
    console.log("In action: what is my respone?", response.data.artworks.rows);
    dispatch(fetchParksSuccess(response.data.artworks.rows));
  };
};

export const fetchParksSuccess = (artworks) => ({
  type: "FETCH_PARKS_SUCCESS",
  payload: artworks,
});

export function addPark(title, description, imageUrl, country, type, user) {
  try {
    return async function thunk(dispatch, getState) {
      const user = getState().user;
      const response = await axios.post(
        // API endpoint:
        `${apiUrl}/park`,
        // Data to be sent along:
        {
          title: title,
          description: description,
          image: imageUrl,
          country: country,
          type: type,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log("sucess, the data was sent:", response);
      dispatch(setMessage("success", true, "Park have been created"));
    };
  } catch (error) {
    console.log(error);
  }
}
