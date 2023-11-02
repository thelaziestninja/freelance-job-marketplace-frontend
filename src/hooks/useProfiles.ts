import { useQuery } from "react-query";
import { checkProfileExists, getProfiles } from "../services/api";
import { AxiosResponse } from "axios";
import { ProfileI } from "../types";

export const useProfiles = () => {
  return useQuery<AxiosResponse<ProfileI[]>, Error>("profiles", getProfiles);
};

export const useProfileExistence = () => {
  return useQuery<{ exists: boolean }, Error>("profileExistence", async () => {
    const response = await checkProfileExists();
    return response.data;
  });
};
