import NoContent from "../components/NoContent";
import { AuthContext } from "../auth/AuthContext";
import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
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
