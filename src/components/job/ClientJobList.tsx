import React from "react";
import ClientJobCard from "./ClientJobCard";
import { useGetJobsQuery } from "../../features/jobs/jobsSlice";
const JobList: React.FC = () => {
  const { data, error, isLoading } = useGetJobsQuery();
  // console.log("Job data:", data);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Jobs</h2>
      {isLoading && <div>Loading jobs...</div>}
      {error && <div>Error loading jobs: {error.message}</div>}
      {data &&
        Array.isArray(data.jobs.jobs) &&
        data.jobs.jobs.map((job) => <ClientJobCard key={job._id} job={job} />)}
    </div>
  );
};

export default JobList;
