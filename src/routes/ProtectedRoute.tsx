import { useNavigate } from "react-router-dom";
import NoContent from "../components/NoContent";
import { AuthContext } from "../auth/AuthContext";
import React, { useContext, useEffect } from "react";
import ClientDashboard from "../components/ClientDashboard";
import FreelancerDashboard from "../components/FreelancerDashboard";

const ComponentMap = {
  freelancer: FreelancerDashboard,
  client: ClientDashboard,
};

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, userType } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("userType:", userType);

  useEffect(() => {
    if (isAuthenticated === false) {
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
