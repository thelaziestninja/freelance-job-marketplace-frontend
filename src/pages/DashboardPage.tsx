import React from "react";
import JobList from "../components/job/JobList";

const DashboardPage: React.FC = () => {
  return (
    <div className="h-screen bg-custom-pink flex justify-center items-center p-8">
      {/* Main Content */}
      <div className="flex w-full max-w-screen-xl bg-white p-8 rounded-lg shadow-md space-x-8">
        {/* Job Listings */}
        <div className="flex-1">
          <JobList />
        </div>

        {/* Freelancer Profiles */}
        <div className="flex-none w-64">
          {/* Profiles Title */}
          <h2 className="text-2xl font-bold mb-4">Freelancers</h2>
          {/* Freelancer profiles will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
