import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { getUsers } from "../services/api";
import { UserI } from "../utils/types";

export const useUsers = () => {
  return useQuery<AxiosResponse<UserI[]>, Error>("users", getUsers);
};
