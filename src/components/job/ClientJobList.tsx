import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ClientJobCard from "./ClientJobCard";
import { jobStore } from "../../stores/jobStore";

const JobList: React.FC = observer(() => {
  useEffect(() => {
    jobStore.loadJobs();
  }, []);

  const { jobs, jobStoreError, isJobsLoading } = jobStore;
  // console.log("Jobs:", jobs);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Jobs</h2>
      {isJobsLoading && <div>Loading jobs...</div>}
      {jobStoreError && <div>Error loading jobs: {jobStoreError.message}</div>}
      {jobs.map((job) => (
        <ClientJobCard key={job._id} job={job} />
      ))}
    </div>
  );
});

export default JobList;
