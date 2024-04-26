import React from "react";
import { useSelector } from "react-redux";
import NoContent from "../components/NoContent";
import ClientDashboard from "../components/ClientDashboard";

import FreelancerDashboard from "../components/FreelancerDashboard";
import { selectUserType } from "../features/auth/authSlice";

const ComponentMap = {
  freelancer: FreelancerDashboard,
  client: ClientDashboard,
};

export const DashboardPage: React.FC = () => {
  const userType = useSelector(selectUserType);
  console.log("User Type:", userType);

  const Component = userType ? ComponentMap[userType] : NoContent;

  return (
    <div className="dashboard">
      <Component />
    </div>
  );
};
