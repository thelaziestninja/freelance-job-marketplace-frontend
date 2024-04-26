import NoContent from "../components/NoContent";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../features/auth/authSlice";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
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
