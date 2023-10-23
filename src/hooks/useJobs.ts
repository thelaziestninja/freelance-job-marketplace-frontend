import { getJobs } from "../services/api";
import { AxiosResponse } from "axios";
import { JobI } from "../utils/types";
import { useQuery } from "react-query";

export const useJobs = () => {
  return useQuery<AxiosResponse<JobI[]>, Error>("jobs", getJobs);
};
