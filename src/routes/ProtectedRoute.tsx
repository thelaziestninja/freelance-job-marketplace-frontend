import { useAtom } from "jotai";
import NoContent from "../components/NoContent";
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { authAtom } from "../state/authAtoms";

const ProtectedRoute: React.FC = () => {
  const [{ isAuthenticated }] = useAtom(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <NoContent />;
  }

  console.log("Rendering Outlet because isAuthenticated is true");
  return <Outlet />;
};

export default ProtectedRoute;
