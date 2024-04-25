import { CreateJobDataI, JobI, Jobs } from "../types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createJob, getJobs, getMyJobs } from "../services/api";

export const useJobs = () => {
  return useQuery<Jobs, Error>("jobs", getJobs);
};

export const useMyJobs = () => {
  return useQuery<JobI[], Error>("myJobs", getMyJobs);
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation((jobData: CreateJobDataI) => createJob(jobData), {
    onSuccess: () => {
      queryClient.invalidateQueries("jobs");
      queryClient.invalidateQueries("myJobs");
    },
  });
};
