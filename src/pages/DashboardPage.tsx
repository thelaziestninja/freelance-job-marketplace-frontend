import React from "react";
import NoContent from "../components/NoContent";
import ClientDashboard from "../components/ClientDashboard";
import FreelancerDashboard from "../components/FreelancerDashboard";
import { useAtom } from "jotai";
import { authAtom } from "../state/authAtoms";

const ComponentMap = {
  freelancer: FreelancerDashboard,
  client: ClientDashboard,
};

export const DashboardPage: React.FC = () => {
  const [{ userType }] = useAtom(authAtom);
  console.log("User Type:", userType);

  const Component = userType ? ComponentMap[userType] : NoContent;

  return (
    <div className="dashboard">
      <Component />
    </div>
  );
};
