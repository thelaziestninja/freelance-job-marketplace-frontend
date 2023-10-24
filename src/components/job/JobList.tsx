import React from "react";
import { useJobs } from "../../hooks/useJobs";
import JobCard from "./JobCard";

const JobList: React.FC = () => {
  const { data, error, isLoading } = useJobs();
  // console.log("Job data:", data);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jobs you might like</h2>
      {isLoading && <div>Loading jobs...</div>}
      {error && <div>Error loading jobs: {error.message}</div>}
      {data &&
        Array.isArray(data.jobs.jobs) &&
        data.jobs.jobs.map((job) => <JobCard key={job._id} job={job} />)}
    </div>
  );
};

export default JobList;
