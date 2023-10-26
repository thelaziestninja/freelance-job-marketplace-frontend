import React from "react";
import ClientDashboard from "./ClientDashboard";
import FreelancerDashboard from "./FreelancerDashboard";
import { useAuth } from "../auth/auth";

const Dashboard: React.FC = () => {
  const { userType } = useAuth();
  // console.log("User Type:", userType);

  return (
    <div className="dashboard">
      {userType === "freelancer" ? (
        <FreelancerDashboard />
      ) : (
        <ClientDashboard />
      )}
    </div>
  );
};

export default Dashboard;
