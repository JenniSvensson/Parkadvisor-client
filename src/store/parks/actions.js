import axios from "axios";
import { selectUser } from "../user/selectors"


export const fetchArtworks = () => {
    return async (dispatch, getState) => {
        const artCount = getState().park.length;
        const response = await axios.get(`${apiUrl}/parks?limit=10&offset=${artCount}`)
        console.log("In action: what is my respone?", response.data.parks.rows);
        dispatch(fetchParksSuccess(response.data.parks.rows));
    }
}

export const fetchParksSuccess = parks => ({
    type: "FETCH_PARKS_SUCCESS",
    payload: parks
});


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
    type: "POST_SUCCES",
    payload: newReview
})