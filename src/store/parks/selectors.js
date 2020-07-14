export const selectParks = (state) => state.art;

export const selectParkById = (id) => (reduxState) => {
  if (reduxState.park) {
    const result = reduxState.park.find((recipe) => {
      return recipe.id === id;
    });

    return result;
  }
};
