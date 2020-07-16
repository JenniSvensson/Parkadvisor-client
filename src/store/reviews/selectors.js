export const selectReviews = (state) => state.reviews;

export const selectReviewsById = (id) => (state) => {
  if (state.reviews) {
    const result = state.reviews.filter((review) => {
      return review.parkId === parseInt(id);
    });
    return result;
  }
};
