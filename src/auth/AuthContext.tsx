import React, { createContext, useState, ReactNode } from "react";
import * as AuthService from "./authService";

export interface AuthContextType {
  token: string | undefined;
  userType: "client" | "freelancer" | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

type UserType = "client" | "freelancer";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>();
  const [userType, setUserType] = useState<UserType>();

  //Debug Token After Login
  const login = async (username: string, password: string) => {
    // console.log("login function called");
    const data = await AuthService.login(username, password);
    // console.log("Token after login in AuthContext:", token);
    if (typeof data.token !== "string") throw new Error("Token not valid!");
    updateToken(data.token);
    updateUserType(data.userType);
  };

  const updateToken = async (providedToken: string) => {
    AuthService.setToken(providedToken);
    setToken(providedToken);
  };

  const updateUserType = async (providedUserType: UserType) => {
    AuthService.setUserType(providedUserType);
    setUserType(providedUserType);
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setToken(undefined);
      setUserType(undefined);
      AuthService.removeToken();
      AuthService.removeUserType();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
