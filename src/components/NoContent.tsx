import React from "react";
import { useNavigate } from "react-router-dom";

const NoContent: React.FC = () => {
  const navigate = useNavigate();

  const onClick = async () => {
    navigate("/login");
  };

  return (
    <div className="h-screen bg-custom-pink flex justify-center items-center p-8">
      {/* Main Content */}
      <div className="w-full max-w-screen-md bg-white p-8 rounded-lg shadow-md flex flex-col items-center space-y-8">
        {/* Freelancer Profile Photo */}

        {/* This is a placeholder for the freelancer's profile picture */}
        {/* Freelancer Description */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Content</h2>
          <p className="text-gray-600">
            You are not logged in. Please log in to view your dashboard.
          </p>
        </div>
        <button
          onClick={onClick}
          type="submit"
          className="w-full p-2 bg-custom-coral text-white rounded-md hover:bg-dark-pink transition duration-300"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default NoContent;
