import React, { createContext, ReactNode, useState } from "react";

interface UserContextType {
  profilePicture: string;
  setProfilePicture: (url: string) => void;
}

const defaultState: UserContextType = {
  profilePicture:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU",
  setProfilePicture: () => {},
};

export const UserContext = createContext<UserContextType>(defaultState);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState(
    defaultState.profilePicture
  );

  return (
    <UserContext.Provider value={{ profilePicture, setProfilePicture }}>
      {children}
    </UserContext.Provider>
  );
};
