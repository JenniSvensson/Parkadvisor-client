import axios from "axios";
import { apiUrl } from "../../config/constants";
import { showMessageWithTimeout,appLoading, appDoneLoading } from "../appState/actions";

//FETCH PARKS
export const fetchParks = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/park`);
    //console.log("Fetched parks:", response.data.rows);
    dispatch(appDoneLoading());
    dispatch(fetchParksSuccess(response.data.rows));
  };
};
export const fetchParksSuccess = (parks) => ({
  type: "FETCH_PARKS_SUCCESS",
  payload: parks,
});

//FETCH MORE PARKS
export const fetchMoreParks = () => {
  return async (dispatch, getState) => {
    const offset = getState().parks.length;
    const response = await axios.get(
      `${apiUrl}/park?offset=${offset}&limit=10`
    );
    //console.log("Fetched more parks:", response.data.rows);
    dispatch(fetchMoreParksSuccess(response.data.rows));
  };
};
export const fetchMoreParksSuccess = (parks) => ({
  type: "FETCH_MORE_PARKS_SUCCESS",
  payload: parks,
});

//ADD PARK

export function addPark(title, description, imageUrl, country, type, user) {
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

    dispatch(showMessageWithTimeout("success", true, "Park have been created"));
  };

}

//REPORT A PARK
export function reportPark(parkId) {
  return async function thunk(dispatch, getState) {
    const user = getState().user;
    const response = await axios.patch(
      // API endpoint:
      `${apiUrl}/park/${parkId}/report`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    console.log("reported:", response);

    dispatch(showMessageWithTimeout("success", true, "Park has been reported"));
  };
}
