import { apiSlice } from "../../app/api/apiSlice";
import { ProfileI, ProfilesI, CteateProfileData } from "../../types";

export const profilesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfiles: builder.query<ProfilesI, void>({
      query: () => "/profiles",
      providesTags: (result) =>
        result?.profiles
          ? result.profiles.map(({ _id }) => ({ type: "Profile", _id }))
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
