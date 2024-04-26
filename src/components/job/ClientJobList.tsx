import React from "react";
import ClientJobCard from "./ClientJobCard";
import { useGetJobsQuery } from "../../features/jobs/jobsSlice";
import { JobI } from "../../types";
import { isFetchBaseQueryError } from "../../utils/isFetchBaseError";

const JobList: React.FC = () => {
  const { data, error, isLoading } = useGetJobsQuery();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Jobs</h2>
      {isLoading && <div>Loading jobs...</div>}
      {error && (
        <div>
          Error loading jobs:{" "}
          {isFetchBaseQueryError(error) ? error.status : "Unknown error"}
        </div>
      )}
      {data &&
        Array.isArray(data.jobs) &&
        data.jobs.map((job: JobI) => <ClientJobCard key={job._id} job={job} />)}
    </div>
  );
};

export default JobList;
