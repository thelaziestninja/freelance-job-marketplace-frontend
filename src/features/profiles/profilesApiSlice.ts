import { apiSlice } from "../../app/api/apiSlice";
import { ProfileI, CteateProfileData } from "../../types";

export const profilesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfiles: builder.query<ProfileI[], void>({
      query: () => "/profiles",
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "Profile", _id }))
          : ["Profile"],
    }),
    getProfile: builder.query<ProfileI, void>({
      query: () => `/profile`,
    }),
    createProfile: builder.mutation<ProfileI, CteateProfileData>({
      query: (profileData) => ({
        url: `/profile`,
        method: "POST",
        body: profileData,
      }),
    }),
    updateProfile: builder.mutation<ProfileI, CteateProfileData>({
      query: (profileData) => ({
        url: `/profile`,
        method: "PUT",
        body: profileData,
      }),
    }),
    checkProfileExists: builder.query<{ exists: boolean }, void>({
      query: () => "/profile/exists",
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useCheckProfileExistsQuery,
} = profilesApiSlice;
