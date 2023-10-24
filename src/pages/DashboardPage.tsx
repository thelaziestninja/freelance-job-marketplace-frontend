import React from "react";
import JobList from "../components/job/JobList";

const DashboardPage: React.FC = () => {
  return (
    <div className="h-screen bg-custom-pink flex justify-center p-8 overflow-hidden">
      {/* Main Content */}
      <div className="flex w-full max-w-screen-xl bg-dark-pink p-8 shadow-md space-x-8 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-custom-coral scrollbar-track-custom-purple">
        {/* Job Listings */}
        <div className="flex-1">
          <div className="overflow-y-auto pr-4">
            <JobList />
          </div>
        </div>

        {/* Freelancer Profiles */}
        <div className="flex-none w-64 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Freelancers</h2>
          {/* Freelancer profiles will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
