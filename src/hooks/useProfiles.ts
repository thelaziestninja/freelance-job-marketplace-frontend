import { UseMutationResult, useMutation, useQuery } from "react-query";
import {
  checkProfileExists,
  createProfile,
  getProfile,
  getProfiles,
  updateProfile,
} from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import { ProfileI, ProfileInput } from "../types";

export const useProfiles = () => {
  return useQuery<AxiosResponse<ProfileI[]>, Error>("profiles", getProfiles);
};

export const useProfile = () => {
  return useQuery<ProfileI, AxiosError>("profile", getProfile, {
    refetchOnWindowFocus: true,
  });
};

export const useProfileExistence = () => {
  return useQuery<{ exists: boolean }, Error>(
    "profileExistence",
    async () => {
      const response = await checkProfileExists();
      return response.data;
    },
    {
      refetchOnWindowFocus: true,
    }
  );
};

export const useCreateProfile = (): UseMutationResult<
  AxiosResponse<ProfileI>,
  AxiosError,
  ProfileInput
> => {
  return useMutation<AxiosResponse<ProfileI>, AxiosError, ProfileInput>(
    createProfile
  );
};

export const useUpdateProfile = (): UseMutationResult<
  AxiosResponse<ProfileI>,
  AxiosError,
  ProfileInput
> => {
  return useMutation<AxiosResponse<ProfileI>, AxiosError, ProfileInput>(
    updateProfile
  );
};
