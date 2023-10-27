import { createApplication } from "../services/api";
import { useMutation, useQueryClient } from "react-query";

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
