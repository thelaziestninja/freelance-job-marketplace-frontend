import { useQuery } from "react-query";
import { getProfiles } from "../services/api";
import { AxiosResponse } from "axios";
import { ProfileI } from "../utils/types";

export const useProfiles = () => {
  return useQuery<AxiosResponse<ProfileI[]>, Error>("profiles", getProfiles);
};