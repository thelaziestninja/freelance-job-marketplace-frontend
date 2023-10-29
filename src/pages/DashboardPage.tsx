import React from "react";
import NoContent from "../components/NoContent";
import { useAuth } from "../auth/auth";
import ClientDashboard from "../components/ClientDashboard";
import FreelancerDashboard from "../components/FreelancerDashboard";

const ComponentMap = {
  freelancer: FreelancerDashboard,
  client: ClientDashboard,
};

const Dashboard: React.FC = () => {
  const { userType } = useAuth();
  console.log("User Type:", userType);

  const Component = userType ? ComponentMap[userType] : NoContent;

  return (
    <div className="dashboard">
      <Component />
    </div>
  );
};

export default Dashboard;
