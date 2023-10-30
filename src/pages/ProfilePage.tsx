import React from "react";

export const ProfilePage: React.FC = () => {
  return (
    <div className="h-screen bg-custom-pink flex justify-center items-center p-8">
      {/* Main Content */}
      <div className="w-full max-w-screen-md bg-white p-8 rounded-lg shadow-md flex flex-col items-center space-y-8">
        {/* Freelancer Profile Photo */}
        <div className="w-48 h-48 bg-gray-300 rounded-full"></div>{" "}
        {/* This is a placeholder for the freelancer's profile picture */}
        {/* Freelancer Description */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Freelancer Name</h2>
          <p className="text-gray-600">
            This is a brief description about the freelancer. It can talk about
            their skills, experiences, and any other relevant information.
          </p>
        </div>
        {/* Edit Button */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          Edit
        </button>
      </div>
    </div>
  );
};
