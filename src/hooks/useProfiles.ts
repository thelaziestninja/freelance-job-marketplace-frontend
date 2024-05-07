import { ProfileI } from "../types";
import { useQuery } from "react-query";
import { getProfiles } from "../services/api";

export const useProfiles = () => {
  return useQuery<ProfileI[], Error>("profiles", getProfiles);
};
