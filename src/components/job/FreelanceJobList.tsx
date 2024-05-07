import React, { useEffect } from "react";
import JobCard from "./JobCard";
import { observer } from "mobx-react-lite";
import { jobStore } from "../../stores/jobStore";

const JobList: React.FC = observer(() => {
  useEffect(() => {
    jobStore.loadJobs();
  }, []);

  const { jobs, jobStoreError, isJobsLoading } = jobStore;
  // console.log("Jobs:", jobs);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jobs you might like</h2>
      {isJobsLoading && <div>Loading jobs...</div>}
      {jobStoreError && <div>Error loading jobs: {jobStoreError.message}</div>}
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
});

export default JobList;
