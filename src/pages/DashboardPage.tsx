import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div className="h-screen bg-custom-pink flex justify-center items-center p-8">
      {/* Main Content */}
      <div className="flex w-full max-w-screen-xl bg-white p-8 rounded-lg shadow-md space-x-8">
        {/* Job Listings */}
        <div className="flex-1">
          {/* Job Title */}
          <h2 className="text-2xl font-bold mb-4">Jobs</h2>

          {/* Example Job */}
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-medium">Job Title Here</h3>
            <p className="text-gray-600 mt-2">
              Job description goes here. This is just a brief overview of the
              job.
            </p>
          </div>
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-medium">Job Title Here</h3>
            <p className="text-gray-600 mt-2">
              Job description goes here. This is just a brief overview of the
              job.
            </p>
          </div>
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-medium">Job Title Here</h3>
            <p className="text-gray-600 mt-2">
              Job description goes here. This is just a brief overview of the
              job.
            </p>
          </div>
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-medium">Job Title Here</h3>
            <p className="text-gray-600 mt-2">
              Job description goes here. This is just a brief overview of the
              job.
            </p>
          </div>
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-medium">Job Title Here</h3>
            <p className="text-gray-600 mt-2">
              Job description goes here. This is just a brief overview of the
              job.
            </p>
          </div>
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-medium">Job Title Here</h3>
            <p className="text-gray-600 mt-2">
              Job description goes here. This is just a brief overview of the
              job.
            </p>
          </div>

          {/* ... Other jobs can be listed in a similar manner ... */}
        </div>

        {/* Freelancer Profiles */}
        <div className="flex-none w-64">
          {/* Profiles Title */}
          <h2 className="text-2xl font-bold mb-4">Freelancers</h2>

          {/* Example Freelancer Profile */}
          <div className="mb-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>{" "}
            {/* This is a placeholder for the freelancer's profile picture */}
            <h3 className="text-lg font-medium">Freelancer Name</h3>
          </div>
          <div className="mb-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>{" "}
            {/* This is a placeholder for the freelancer's profile picture */}
            <h3 className="text-lg font-medium">Freelancer Name</h3>
          </div>
          <div className="mb-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>{" "}
            {/* This is a placeholder for the freelancer's profile picture */}
            <h3 className="text-lg font-medium">Freelancer Name</h3>
          </div>
          <div className="mb-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>{" "}
            {/* This is a placeholder for the freelancer's profile picture */}
            <h3 className="text-lg font-medium">Freelancer Name</h3>
          </div>
          <div className="mb-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>{" "}
            {/* This is a placeholder for the freelancer's profile picture */}
            <h3 className="text-lg font-medium">Freelancer Name</h3>
          </div>
          {/* ... Other freelancer profiles can be added in a similar manner ... */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
