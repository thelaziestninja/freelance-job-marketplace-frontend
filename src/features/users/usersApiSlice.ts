import { apiSlice } from "../../app/api/apiSlice";
import { UserI, RegisterUserDataI } from "../../types";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserI[], void>({
      query: () => "/users",
    }),
    registerUser: builder.mutation<UserI, RegisterUserDataI>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useRegisterUserMutation } = extendedApiSlice;
