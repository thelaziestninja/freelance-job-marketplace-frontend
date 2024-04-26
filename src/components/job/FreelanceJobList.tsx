import React from "react";
import JobCard from "./JobCard";
import { useGetJobsQuery } from "../../features/jobs/jobsSlice";

const JobList: React.FC = () => {
  // const { data, error, isLoading } = useJobs();
  const { data, error, isLoading } = useGetJobsQuery();
  // console.log("Job data:", data);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jobs you might like</h2>
      {isLoading && <div>Loading jobs...</div>} // add error in the curly braces
      {error && <div>Error loading jobs: {}</div>}
      {data &&
        Array.isArray(data.jobs.jobs) &&
        data.jobs.jobs.map((job) => <JobCard key={job._id} job={job} />)}
    </div>
  );
};

export default JobList;
