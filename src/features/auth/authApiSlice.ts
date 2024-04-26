import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
// const selectIsClient = (state) => state.auth.userType === 'client';
// const selectIsFreelancer = (state) => state.auth.userType === 'freelancer';

// // In your component
// const isClient = useSelector(selectIsClient);
// const isFreelancer = useSelector(selectIsFreelancer);

// Use 'isClient' or 'isFreelancer' to conditionally render UI elements
