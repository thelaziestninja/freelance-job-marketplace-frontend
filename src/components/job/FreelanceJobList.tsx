import React from "react";
import JobCard from "./JobCard";
import { useGetJobsQuery } from "../../features/jobs/jobsSlice";
import { JobI } from "../../types";
import { isFetchBaseQueryError } from "../../utils/isFetchBaseError";

const JobList: React.FC = () => {
  const { data, error, isLoading } = useGetJobsQuery();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jobs you might like</h2>
      {isLoading && <div>Loading jobs...</div>} // add error in the curly braces
      {error && (
        <div>
          Error loading jobs:{" "}
          {isFetchBaseQueryError(error) ? error.status : "Unknown error"}
        </div>
      )}
      {data &&
        Array.isArray(data.jobs) &&
        data.jobs.map((job: JobI) => <JobCard key={job._id} job={job} />)}
    </div>
  );
};

export default JobList;
