import { UseMutationResult, useMutation, useQuery } from "react-query";
import { createProfile, getProfiles, updateProfile } from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import { ProfileI, ProfileInput } from "../types";

export const useProfiles = () => {
  return useQuery<ProfileI[], Error>("profiles", getProfiles);
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
