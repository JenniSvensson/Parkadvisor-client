const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LIKES_SUCCESS":
      return action.payload;
    case "ADD_LIKE":
      return [...state, ...action.payload];
    case "REMOVE_LIKE":
      return [...state.filter((like) => like.id !== action.payload)];
    default:
      return state;
  }
};
