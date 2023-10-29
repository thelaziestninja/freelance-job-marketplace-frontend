import { useContext } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  // console.log("Token in useAuth:", context.token);
  // console.log("UserType in useAuth:", context.userType);
  return context;
};
