import { ProfileI } from "../types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserType } from "../features/auth/authSlice";
import { useGetMyJobsQuery } from "../features/jobs/jobsSlice";
import { useGetProfileQuery } from "../features/profiles/profilesApiSlice";
import ApplicationList from "../components/applications/ApplicationList";
import { useGetApplicationsQuery } from "../features/applications/applicationsSlice";

export const ApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const userType = useSelector(selectUserType);

  const {
    data: myJobsData,
    isLoading: isLoadingJobs,
    isError: isJobsError,
  } = useGetMyJobsQuery();

  const {
    data: profilesData,
    isLoading: isLoadingProfiles,
    isError: isProfilesError,
  } = useGetProfileQuery();

  // Debug: Log the jobs data to verify its structure
  console.log("Jobs Data:", myJobsData);
  console.log("Profiles Data:", profilesData);

  useEffect(() => {
    if (userType !== "freelancer") {
      navigate("/login");
    }
  }, [userType, navigate]);

  // Determine the job_id, ensuring it's not undefined before proceeding
  const job_id = myJobsData?.jobs?.[0]?._id;

  const {
    data: applications,
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
  } = useGetApplicationsQuery(
    { job_id },
    {
      skip: !job_id, // Skip the query if job_id is undefined
    }
  );

  if (isLoadingJobs || isLoadingProfiles || isLoadingApplications) {
    return <div>Loading...</div>;
  }

  if (isJobsError || isProfilesError || isErrorApplications) {
    return <div>Error fetching data.</div>;
  }

  if (
    !applications ||
    applications.applications.length === 0 ||
    !profilesData ||
    !myJobsData
  ) {
    return <div>No data found.</div>;
  }

  const profiles: ProfileI[] = profilesData ? [profilesData] : [];

  return (
    <div className="h-screen bg-custom-pink flex justify-center items-center p-8">
      <div className="w-full max-w-screen-lg bg-white p-8 rounded-lg shadow-md">
        <ApplicationList
          applications={applications.applications}
          profiles={profiles}
        />
      </div>
    </div>
  );
};

export default ApplicationPage;
