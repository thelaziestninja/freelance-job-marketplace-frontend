import React from "react";

// This is just a placeholder type for an application. You will replace this with your actual data model.
type Application = {
  freelancerName: string;
  freelancerProfilePicture: string;
  coverLetter: string; // Assuming you might want to display a brief cover letter or something similar.
};

const ApplicationPage: React.FC = () => {
  // Placeholder data. Replace this with actual data fetched from your backend.
  const applications: Application[] = [
    {
      freelancerName: "John Doe",
      freelancerProfilePicture: "path_to_image1.jpg",
      coverLetter: "I'm interested in this job because...",
    },
    {
      freelancerName: "Jane Smith",
      freelancerProfilePicture: "path_to_image2.jpg",
      coverLetter: "I believe I am the perfect fit because...",
    },
    // ... add more applications as needed
  ];

  return (
    <div className="h-screen bg-custom-pink  flex justify-center items-center p-8">
      {/* Main Content */}
      <div className="w-full max-w-screen-lg bg-white p-8 rounded-lg shadow-md">
        {/* Applications List */}
        <ul>
          {applications.map((application, idx) => (
            <li key={idx} className="flex items-center space-x-4 mb-6">
              {/* Freelancer Profile Picture */}
              <img
                src={application.freelancerProfilePicture}
                alt={`${application.freelancerName}'s profile`}
                className="w-16 h-16 rounded-full"
              />

              {/* Freelancer Name and Cover Letter */}
              <div>
                <h3 className="text-xl font-bold">
                  {application.freelancerName}
                </h3>
                <p className="text-gray-600">{application.coverLetter}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicationPage;
