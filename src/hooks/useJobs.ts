import { JobI, JobsResponse } from "../types";
import { useQuery } from "react-query";
import { getJobs, getMyJobs } from "../services/api";

export const useJobs = () => {
  return useQuery<JobsResponse, Error>("jobs", getJobs);
};

export const useMyJobs = () => {
  return useQuery<JobI[], Error>("myJobs", getMyJobs);
};
