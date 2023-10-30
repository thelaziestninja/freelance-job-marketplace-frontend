import React, { createContext, useState, ReactNode, useEffect } from "react";
import * as AuthService from "./authService";

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | undefined;
  userType: "client" | "freelancer" | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  token: undefined,
  userType: undefined,
  login: async () => {},
  logout: async () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

type UserType = "client" | "freelancer";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [userType, setUserType] = useState<UserType | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const checkedToken = localStorage.getItem("token");
      setIsAuthenticated(!!checkedToken);
    };
    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string) => {
    const data = await AuthService.login(username, password);
    if (typeof data.token !== "string") throw new Error("Token not valid!");
    updateToken(data.token);
    updateUserType(data.userType);
    setIsAuthenticated(true);
  };

  const updateToken = (providedToken: string) => {
    AuthService.setToken(providedToken);
    setToken(providedToken);
  };

  const updateUserType = (providedUserType: UserType) => {
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
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, userType, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
