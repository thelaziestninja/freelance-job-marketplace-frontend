import React from "react";
import { ApplicationI, ProfileI } from "../../types";
import { useGetMyApplicationsQuery } from "../../features/applications/applicationsSlice";
import { useGetProfilesQuery } from "../../features/profiles/profilesApiSlice";

type ApplicationListProps = {
  applications: ApplicationI[];
  profiles: ProfileI[];
};

const ApplicationList: React.FC<ApplicationListProps> = () => {
  const {
    data: applications,
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
  } = useGetMyApplicationsQuery();
  const {
    data: profiles,
    isLoading: isLoadingProfiles,
    isError: isErrorProfiles,
  } = useGetProfilesQuery();

  if (isLoadingApplications || isLoadingProfiles) {
    return <div>Loading applications...</div>;
  }

  if (isErrorApplications || isErrorProfiles) {
    return <div>Error loading data. Please try again later.</div>;
  }

  if (
    !applications ||
    applications.length === 0 ||
    !profiles ||
    profiles.length === 0
  ) {
    return <div>No applications found.</div>;
  }

  const applicationsWithProfilePicture = applications.map((application) => {
    const profile = profiles?.find((p) => p.user === application.freelancer_id);
    return {
      ...application,
      freelancerProfilePicture: profile?.imgUrl,
      freelancerName: profile?.name,
      coverLetter: application.cover_letter,
    };
  });

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

// with removing that applicationsWithProfilePicture
// return (
//   <ul>
//       {applications.map((application, idx) => {
//           const profile = profiles.find(p => p.userId === application.userId);
//           return (
//               <li key={idx} className="flex items-center space-x-4 mb-6">
//                   <img
//                       src={profile?.imgUrl || "default_profile_pic.jpg"}
//                       alt={`${profile?.name}'s profile`}
//                       className="w-16 h-16 rounded-full"
//                   />
//                   <div>
//                       <h3 className="text-xl font-bold">{profile?.name}</h3>
//                       <p className="text-gray-600">{application.coverLetter}</p>
//                   </div>
//               </li>
//           );
//       })}
//   </ul>
// );
// };

// export default ApplicationList;
