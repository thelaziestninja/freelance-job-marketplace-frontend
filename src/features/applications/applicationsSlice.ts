import { apiSlice } from "../../app/api/apiSlice";
import {
  ApplicationI,
  ApplicationsI,
  CreateApplicationDataI,
} from "../../types";

export const applicationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query<ApplicationsI, { job_id: string }>({
      query: ({ job_id }) => `/job/${job_id}/applications`,
      providesTags: (result) =>
        result?.applications
          ? result.applications.map(({ _id }) => ({ type: "Application", _id }))
          : ["Application"],
    }),
    createApplication: builder.mutation<ApplicationI, CreateApplicationDataI>({
      query: ({ job_id, cover_letter }) => ({
        url: `/job/${job_id}/apply`,
        method: "POST",
        body: { cover_letter },
      }),
    }),
  }),
});

export const { useGetApplicationsQuery, useCreateApplicationMutation } =
  applicationsApiSlice;
