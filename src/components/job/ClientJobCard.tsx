import React from "react";
import { JobI } from "../../types";

const JobCard: React.FC<{ job: JobI }> = ({ job }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold">{job.title}</h3>
      <p className="text-gray-600 mt-2">{job.description}</p>
      <div className="mt-4 flex space-x-4">
        {/* <button className="bg-custom-coral text-white px-4 py-2 rounded">
          Apply Now
        </button> */}
        {/* <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          Learn More
        </button> */}
      </div>
    </div>
  );
};

export default JobCard;
