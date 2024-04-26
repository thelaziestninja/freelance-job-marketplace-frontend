import { apiSlice } from "../../app/api/apiSlice";
import { ReviewI, CreateReviewDataI } from "../../types";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewI[], void>({
      query: () => "/reviews",
    }),
    createReview: builder.mutation<ReviewI, CreateReviewDataI>({
      query: (reviewData) => ({
        url: "/review",
        method: "POST",
        body: reviewData,
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewsApiSlice;
