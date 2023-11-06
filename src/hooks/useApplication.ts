import { createApplication, getApplications } from "../services/api";
import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
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

export const useApplyJob = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ jobId, coverLetter }: { jobId: string; coverLetter: string }) => {
      const response = await createApplication(jobId, coverLetter);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("jobs");
      },
    }
  );
};
