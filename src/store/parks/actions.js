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

export function addPark(title, instructions, imageUrl, country, type, user) {
  try {
    const id = parseInt(user.id);
    return async function thunk(dispatch, getState) {
      const response = await axios.post(
        // API endpoint:
        `${apiUrl}/endPoint`,
        // Data to be sent along:
        {
          title: title,
          instructions: instructions,
          imageUrl: imageUrl,
          country: country,
          type: type,
          userId: id,
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
