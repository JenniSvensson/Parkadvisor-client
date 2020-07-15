import axios from "axios";
import { selectUser } from "../user/selectors";
import { apiUrl } from "../../config/constants";
import { setMessage } from "../appState/actions";

//FETCH PARKS
export const fetchParks = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/park`);
    console.log("In action: what is my respone?", response.data);
    dispatch(fetchParksSuccess(response.data));
  };
};
export const fetchParksSuccess = (parks) => ({
  type: "FETCH_PARKS_SUCCESS",
  payload: parks,
});

//ADD PARK

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
