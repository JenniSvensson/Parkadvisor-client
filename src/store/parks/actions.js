import axios from "axios";
import { selectUser } from "../user/selectors"
import { apiUrl } from "../../config/constants";
import { setMessage } from "../appState/actions";

export const newReview = (title, rating) => {
    return async (dispatch, getState) => {
        const { id, token } = selectUser(getState())
        //dispatch(appLoading())
        const response = await axios.post(`${apiUrl}/reviews/new`,
            {
                title,
                rating
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        //dispatch(showMessageWithTimeout("succes", false, response.data.message, 3000));
        dispatch(reviewPostSucces(response.data.newArtWork))
    }
}

export const reviewPostSucces = newReview => ({
    type: "POST_REVIEW_SUCCES",
    payload: newReview
})

export const fetchParks = () => {
    return async (dispatch, getState) => {
        const artCount = getState().art.length;
        const response = await axios.get(
            `${apiUrl}/park`
        );
        console.log("In action: what is my respone?", response.data.park.rows);
        dispatch(fetchParksSuccess(response.data.parks.rows));
    };
};

export const fetchParksSuccess = (parks) => ({
    type: "FETCH_PARKS_SUCCESS",
    payload: parks,
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