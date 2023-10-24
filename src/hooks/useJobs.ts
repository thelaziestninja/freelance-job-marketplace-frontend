import { JobsResponse } from "../types";
import { useQuery } from "react-query";
import { getJobs } from "../services/api";

export const useJobs = () => {
  return useQuery<JobsResponse, Error>("jobs", getJobs);
};
