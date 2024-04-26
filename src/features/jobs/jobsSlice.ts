import { apiSlice } from "../../app/api/apiSlice";
import { JobI, CreateJobDataI, JobsResponse } from "../../types";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobsResponse, void>({
      query: () => "/jobs",
      providesTags: (result) =>
        result
          ? [
              ...result.jobs.map(({ _id }) => ({ type: "Job" as const, _id })),
              { type: "Job", id: "LIST" },
            ]
          : [{ type: "Job", id: "LIST" }],
    }),
    getMyJobs: builder.query<JobI[], void>({
      query: () => "/my-jobs",
    }),
    createJob: builder.mutation<JobI, CreateJobDataI>({
      query: (jobData) => ({
        url: "/job",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: [{ type: "Job", id: "LIST" }],
    }),
  }),
});

export const { useGetJobsQuery, useGetMyJobsQuery, useCreateJobMutation } =
  jobsApiSlice;
