import React from "react";
import ClientDashboard from "./ClientDashboard";
import FreelancerDashboard from "./FreelancerDashboard";
import { useAuth } from "../auth/auth";
import NoContent from "./NoContent";

const ComponentMap = {
  freelancer: FreelancerDashboard,
  client: ClientDashboard,
};

const Dashboard: React.FC = () => {
  const { userType } = useAuth();
  // console.log("User Type:", userType);

  const Component = userType ? ComponentMap[userType] : NoContent;

  return (
    <div className="dashboard">
      <Component />
    </div>
  );
};

export default Dashboard;
