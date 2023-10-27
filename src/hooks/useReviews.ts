import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { ReviewI } from "../types";
import { getReviewsByFreelancer } from "../services/api";

export const useReviewsByFreelancer = (freelancerId: string) => {
  return useQuery<AxiosResponse<ReviewI[]>, Error>(
    ["reviews", freelancerId],
    () => getReviewsByFreelancer(freelancerId),
    {
      enabled: !!freelancerId, // Only run the query if freelancerId is truthy
    }
  );
};
