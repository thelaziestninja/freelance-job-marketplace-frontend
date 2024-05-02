import React from "react";
import { observer } from "mobx-react-lite";
import ClientJobCard from "./ClientJobCard";
import { jobStore } from "../../stores/jobStore";

const JobList: React.FC = observer(() => {
  const { jobs, error, isLoading } = jobStore;
  // console.log("Jobs:", jobs);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Jobs</h2>
      {isLoading && <div>Loading jobs...</div>}
      {error && <div>Error loading jobs: {error.message}</div>}
      {jobs.map((job) => (
        <ClientJobCard key={job._id} job={job} />
      ))}
    </div>
  );
});

export default JobList;
