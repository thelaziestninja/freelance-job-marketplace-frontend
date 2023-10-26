import React, { createContext, useState, ReactNode } from "react";
import { UserI } from "../types";

export interface UserContextProps {
  user: UserI | null;
  setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserI | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
