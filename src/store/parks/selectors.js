export const selectParks = (state) => state.parks;

export const selectParkById = (id) => (state) => {
  if (state.parks.rows) {
    const result = state.parks.rows.find((park) => {
      return park.id === parseInt(id);
    });
    return result;
  }
};
