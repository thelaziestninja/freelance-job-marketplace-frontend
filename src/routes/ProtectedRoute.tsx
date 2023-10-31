import NoContent from "../components/NoContent";
import { AuthContext } from "../auth/AuthContext";
import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("userType:", userType);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <NoContent />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
