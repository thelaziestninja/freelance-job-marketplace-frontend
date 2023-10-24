import React, { createContext, useState, ReactNode } from "react";
import * as AuthService from "./authService";

interface AuthContextType {
  token: string | null;
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
  const [token, setToken] = useState<string | null>(AuthService.getToken());

  const login = async (username: string, password: string) => {
    const token = await AuthService.login(username, password);
    sessionStorage.setItem("token", token);
    setToken(token);
  };

  const logout = async () => {
    if (token) {
      await AuthService.logout();
      sessionStorage.removeItem("token");
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
