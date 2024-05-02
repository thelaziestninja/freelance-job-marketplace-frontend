import { CreateJobDataI, JobI } from "../types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createJob, getMyJobs } from "../services/api";

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
