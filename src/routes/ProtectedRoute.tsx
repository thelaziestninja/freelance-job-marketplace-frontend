import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import NoContent from "../components/NoContent";
import React, { useContext, useEffect } from "react";
import FreelancerDashboard from "../components/FreelancerDashboard";
import ClientDashboard from "../components/ClientDashboard";

const ComponentMap = {
  freelancer: FreelancerDashboard,
  client: ClientDashboard,
};

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, userType } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <NoContent />;
  }

  const Component = userType ? ComponentMap[userType] : NoContent;
  return <Component />;
};

export default ProtectedRoute;
