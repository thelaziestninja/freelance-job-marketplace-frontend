import { atom } from "jotai";
import * as AuthService from "../auth/authService";

type UserType = "client" | "freelancer";

interface AuthState {
  isAuthenticated: boolean;
  token: string | undefined;
  userType: UserType | undefined;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  token: sessionStorage.getItem("token") || undefined,
  userType: sessionStorage.getItem("userType") as UserType | undefined,
};

export const loginAtom = atom(
  null,
  async (
    get,
    set,
    { username, password }: { username: string; password: string }
  ) => {
    try {
      const data = await AuthService.login(username, password);
      if (data && data.token) {
        set(authAtom, {
          isAuthenticated: true,
          token: data.token,
          userType: data.userType,
        });
        sessionStorage.setItem("token", data.token);
        console.log("Token set in authAtom and session storage:", data.token);
        sessionStorage.setItem("userType", data.userType);
      }
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  }
);

export const logoutAtom = atom(null, async (get, set) => {
  const authState = get(authAtom);
  console.log("Attempting to logout with token:", authState.token);
  if (authState.token) {
    try {
      await AuthService.logout();
      set(authAtom, (prevState) => ({
        ...prevState,
        isAuthenticated: false,
        token: undefined,
        userType: undefined,
      }));
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userType");
    } catch (error) {
      console.error("Logout error", error);
      throw error;
    }
  } else {
    console.error("Logout error: No token found");
    throw new Error("No token found");
  }
});
export const authAtom = atom(initialAuthState);
