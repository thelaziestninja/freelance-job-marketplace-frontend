import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { getUsers, registerUser } from "../services/api";
import { RegisterUserDataI, UserI } from "../types";

export const useUsers = () => {
  return useQuery<AxiosResponse<UserI[]>, Error>("users", getUsers);
};

export const useRegister = () => {
  return useMutation((userData: RegisterUserDataI) => registerUser(userData));
};
