import React from "react";
import { useAuth } from "../auth/auth";
import NoContent from "../components/NoContent";
import ClientDashboard from "../components/ClientDashboard";
import FreelancerDashboard from "../components/FreelancerDashboard";

const ComponentMap = {
  freelancer: FreelancerDashboard,
  client: ClientDashboard,
};

export const DashboardPage: React.FC = () => {
  const { userType } = useAuth();
  console.log("User Type:", userType);

  const Component = userType ? ComponentMap[userType] : NoContent;

  return (
    <div className="dashboard">
      <Component />
    </div>
  );
};
