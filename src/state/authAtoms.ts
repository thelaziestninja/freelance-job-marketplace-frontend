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
  token: localStorage.getItem("token") || undefined,
  userType: localStorage.getItem("userType") as UserType | undefined,
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.userType);
      }
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  }
);

export const logoutAtom = atom(null, async (get, set) => {
  try {
    const { token } = get(authAtom);
    if (token) {
      await AuthService.logout();
      set(authAtom, {
        isAuthenticated: false,
        token: undefined,
        userType: undefined,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
    }
  } catch (error) {
    console.error("Logout error", error);
    throw error;
  }
});

export const authAtom = atom(initialAuthState);
