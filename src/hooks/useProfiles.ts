import { UseMutationResult, useMutation, useQuery } from "react-query";
import {
  checkProfileExists,
  createProfile,
  getProfile,
  getProfiles,
  updateProfile,
} from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import { ProfileI, CteateProfileData } from "../types";

export const useProfiles = () => {
  return useQuery<ProfileI[], Error>("profiles", getProfiles);
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
  CteateProfileData
> => {
  return useMutation<AxiosResponse<ProfileI>, AxiosError, CteateProfileData>(
    createProfile
  );
};

export const useUpdateProfile = (): UseMutationResult<
  AxiosResponse<ProfileI>,
  AxiosError,
  CteateProfileData
> => {
  return useMutation<AxiosResponse<ProfileI>, AxiosError, CteateProfileData>(
    updateProfile
  );
};
