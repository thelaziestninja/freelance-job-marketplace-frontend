import { apiSlice } from "../../app/api/apiSlice";
import { JobI, CreateJobDataI, JobsResponse } from "../../types";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobsResponse, void>({
      query: () => "/jobs",
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
    }),
  }),
});

export const { useGetJobsQuery, useGetMyJobsQuery, useCreateJobMutation } =
  jobsApiSlice;
