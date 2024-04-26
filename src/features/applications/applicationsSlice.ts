import { apiSlice } from "../../app/api/apiSlice";
import { ApplicationI, CreateApplicationDataI } from "../../types";

export const applicationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query<ApplicationI[], void>({
      query: () => "/applications",
    }),
    getMyApplications: builder.query<ApplicationI[], void>({
      query: () => "/my-applications",
    }),
    createApplication: builder.mutation<ApplicationI, CreateApplicationDataI>({
      query: (applicationData) => ({
        url: "/application",
        method: "POST",
        body: applicationData,
      }),
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetMyApplicationsQuery,
  useCreateApplicationMutation,
} = applicationsApiSlice;
