import React from "react";

import NoContent from "../components/NoContent";
import ClientDashboard from "../components/ClientDashboard";
import FreelancerDashboard from "../components/FreelancerDashboard";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/authStore";

const ComponentMap = {
  freelancer: FreelancerDashboard,
  client: ClientDashboard,
};

export const DashboardPage: React.FC = observer(() => {
  const { userType } = authStore;
  console.log("User Type:", authStore.userType);

  const Component = userType ? ComponentMap[userType] : NoContent;

  return (
    <div className="dashboard">
      <Component />
    </div>
  );
});
