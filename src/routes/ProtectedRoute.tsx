import { useNavigate } from "react-router-dom";
import NoContent from "../components/NoContent";
import { AuthContext } from "../auth/AuthContext";
import React, { useContext, useEffect } from "react";
import ClientDashboard from "../components/ClientDashboard";
import FreelancerDashboard from "../components/FreelancerDashboard";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const ComponentMap = {
  freelancer: FreelancerDashboard,
  client: ClientDashboard,
};

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, userType, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <LoadingSpinner />; // Render loading spinner while checking authentication status
  }

  if (!isAuthenticated) {
    return <NoContent />;
  }

  const Component = userType ? ComponentMap[userType] : NoContent;
  return <Component />;
};

export default ProtectedRoute;
