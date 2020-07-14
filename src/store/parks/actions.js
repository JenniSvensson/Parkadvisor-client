import axios from "axios";

export const fetchArtworks = () => {
    return async (dispatch, getState) => {
        const artCount = getState().art.length;
        const response = await axios.get(`${apiUrl}/parks?limit=10&offset=${artCount}`)
        console.log("In action: what is my respone?", response.data.artworks.rows);
        dispatch(fetchParksSuccess(response.data.artworks.rows));
    }
}

export const fetchParksSuccess = artworks => ({
    type: "FETCH_PARKS_SUCCESS",
    payload: artworks
});