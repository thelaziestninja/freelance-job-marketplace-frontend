import React from "react";
import { useAuth } from "../auth/auth";
import ClientDashboard from "../components/ClientDashboard";
import FreelancerDashboard from "../components/FreelancerDashboard";

const DashboardPage: React.FC = () => {
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

export default DashboardPage;
