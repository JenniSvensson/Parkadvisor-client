const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "POST_REVIEW_SUCCES":
      return [...state, { ...action.payload }];

    case "FETCH_REVIEWS_SUCCESS":
      return action.payload;

    case "UPDATE_REVIEW_SUCCESS":
      return [...state, action.payload]

    default:
      return state;
  }
};
