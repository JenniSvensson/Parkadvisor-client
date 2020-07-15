
export const selectParks = state => state.parks;

export const selectParkById = (id) => (state) => {
  if (state.parks.length) {
    const result = state.parks.find((park) => {
      return park.id === parseInt(id);
    });
    return result;
  }
};

