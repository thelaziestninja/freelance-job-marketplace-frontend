import React from "react";
import { ApplicationI, ProfileI } from "../../types";

type ApplicationListProps = {
  applications: ApplicationI[]; // Add this line to accept the applications array as a prop
  profiles: ProfileI[]; // You might also need to pass profiles as a prop
};

const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  profiles,
}) => {
  const applicationsWithProfilePicture = applications.map((application) => {
    const profile = profiles.find((p) => p.user === application.freelancer_id);
    return {
      ...application,
      freelancerProfilePicture: profile?.imgUrl,
      freelancerName: profile?.name,
      coverLetter: application.cover_letter,
    };
  });

  if (applications.length === 0) {
    return <div>No applications found.</div>;
  }

  return (
    <ul>
      {applicationsWithProfilePicture.map((application, idx) => (
        <li key={idx} className="flex items-center space-x-4 mb-6">
          <img
            src={
              application.freelancerProfilePicture || "default_profile_pic.jpg"
            } // Use a default picture if imgUrl is not available
            alt={`${application.freelancerName}'s profile`}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold">{application.freelancerName}</h3>
            <p className="text-gray-600">{application.coverLetter}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ApplicationList;
