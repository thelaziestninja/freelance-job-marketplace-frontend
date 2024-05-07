import { JobI } from "../types";
import { useQuery } from "react-query";
import { getMyJobs } from "../services/api";

export const useMyJobs = () => {
  return useQuery<JobI[], Error>("myJobs", getMyJobs);
};
