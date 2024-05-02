import { useMutation } from "react-query";
import { registerUser } from "../services/api";
import { RegisterUserDataI } from "../types";

// export const useUsers = () => {
//   return useQuery<AxiosResponse<UserI[]>, Error>("users", getUsers);
// };

export const useRegister = () => {
  return useMutation((userData: RegisterUserDataI) => registerUser(userData));
};
