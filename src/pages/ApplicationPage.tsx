import React from "react";
import { useMyJobs } from "../hooks/useJobs";
import { useProfiles } from "../hooks/useProfiles";
import { useApplications } from "../hooks/useApplication";
import ApplicationList from "../components/applications/ApplicationList";

export const ApplicationPage: React.FC = () => {
  const myJobsQuery = useMyJobs();
  const profilesQuery = useProfiles();

  // Debug: Log the jobs data to verify its structure
  console.log("Jobs Data:", myJobsQuery.data);

  // Since myJobsQuery.data is JobI[], you don't access a .jobs property.
  const firstJobId = myJobsQuery.data?.jobs?.[0]?._id;

  // Debug: Log the firstJobId to verify its value
  console.log("First Job ID:", firstJobId);

  // Now use firstJobId to fetch applications
  const applicationsQuery = useApplications(firstJobId, {
    // Only enable the query if firstJobId is available and myJobsQuery was successful
    enabled: !!firstJobId && myJobsQuery.isSuccess,
  });

  console.log("Applications Data:", applicationsQuery);
  // Check if anything is loading
  if (
    myJobsQuery.isLoading ||
    applicationsQuery.isLoading ||
    profilesQuery.isLoading
  ) {
    return <div>Loading...</div>; // Add better loading UI as needed
  }

  // Check if there are any errors
  if (myJobsQuery.error || applicationsQuery.error || profilesQuery.error) {
    console.error({
      myJobsError: myJobsQuery.error,
      applicationsError: applicationsQuery.error,
      profilesError: profilesQuery.error,
    });
    return (
      <div>
        Error fetching data:{" "}
        {myJobsQuery.error?.message ||
          applicationsQuery.error?.message ||
          profilesQuery.error?.message}
      </div>
    );
  }
  // Debug: Log the fetched data to verify its structure

  console.log("Profiles Data:", profilesQuery.data);

  // Check if there are no applications or no profiles
  if (
    !firstJobId ||
    !applicationsQuery.data ||
    applicationsQuery.data.length === 0 ||
    !profilesQuery.data
  ) {
    return <div>No applications or profiles found for the selected job.</div>;
  }

  // Ensure that the profiles data is an array
  if (!Array.isArray(profilesQuery.data)) {
    console.error("Profiles data is not an array:", profilesQuery.data);
    return <div>Error: Profiles data is not in the expected format.</div>;
  }

  // Pass both applications and profiles arrays to the ApplicationList component
  return (
    <div className="h-screen bg-custom-pink flex justify-center items-center p-8">
      <div className="w-full max-w-screen-lg bg-white p-8 rounded-lg shadow-md">
        <ApplicationList
          applications={applicationsQuery.data}
          profiles={profilesQuery.data}
        />
      </div>
    </div>
  );
};

export default ApplicationPage;
