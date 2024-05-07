import { getApplications } from "../services/api";
import { UseQueryOptions, useQuery } from "react-query";
import { ApplicationI } from "../types";

export const useApplications = (
  jobId: string | undefined,
  options?: UseQueryOptions<ApplicationI[], Error>
) => {
  return useQuery<ApplicationI[], Error>(
    ["applications", jobId],
    () => {
      if (!jobId) {
        throw new Error("No jobId provided");
      }
      return getApplications(jobId);
    },
    {
      ...options, // Spread the options to include any additional settings
      // enabled: !!jobId && options?.enabled !== false, // Ensure the query is only enabled if jobId is present and not explicitly disabled
    }
  );
};
