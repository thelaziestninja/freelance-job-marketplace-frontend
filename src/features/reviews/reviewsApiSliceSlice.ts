import { apiSlice } from "../../app/api/apiSlice";
import { ReviewI, CreateReviewDataI, ReviewsI } from "../../types";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewsI, { freelancer_id: string }>({
      query: ({ freelancer_id }) => `/profile/${freelancer_id}/reviews`,
      providesTags: (result) =>
        result?.reviews
          ? result.reviews.map(({ _id }) => ({ type: "Review", _id }))
          : ["Review"],
    }),
    createReview: builder.mutation<ReviewI, CreateReviewDataI>({
      query: ({ freelancer_id, rating, review_text }) => ({
        url: `/profile/${freelancer_id}/reviews`,
        method: "POST",
        body: { rating, review_text },
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewsApiSlice;
