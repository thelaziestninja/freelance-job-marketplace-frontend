import React, { createContext, useState, ReactNode } from "react";
import * as AuthService from "./authService";

export interface AuthContextType {
  token: string | null;
  userType: "client" | "freelancer" | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    String(AuthService.getToken())
  );
  const [userType, setUserType] = useState<"client" | "freelancer" | null>(
    AuthService.getUserType() // You should define and use a getUserType function similar to getToken
  );

  //Debug Token After Login
  const login = async (username: string, password: string) => {
    console.log("login function called");
    const { token, userType } = await AuthService.login(username, password);
    console.log("Token after login in AuthContext:", token);
    if (typeof token === "string") {
      AuthService.setToken(token);
    }
    setUserType(userType);
  };

  const logout = async () => {
    if (token) {
      await AuthService.logout();
      sessionStorage.removeItem("token");
      setToken(null);
      setUserType(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
