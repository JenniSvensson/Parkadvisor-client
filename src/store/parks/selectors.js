export const selectParks = (state) => state.art;

export const selectParkById = (id) => (state) => {
  if (state.parks.length) {
    const result = state.parks.find((park) => {
      return park.id === id;
    });
    return result;
  }
};
