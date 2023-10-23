import { getJobs } from "../services/api";
import { JobsResponse } from "../utils/types";
import { useQuery } from "react-query";

export const useJobs = () => {
  return useQuery<JobsResponse, Error>("jobs", getJobs);
};
