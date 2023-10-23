import React from "react";
import { useJobs } from "../../hooks/useJobs";
import { JobI } from "../../utils/types";

const JobList: React.FC = () => {
  const { data, error, isLoading } = useJobs();

  if (isLoading) return <div>Loading jobs...</div>;
  if (error) return <div>Error loading jobs: {error.message}</div>;

  const JobItem: React.FC<{ job: JobI }> = ({ job }) => {
    return (
      <div className="border-b pb-4 mb-4">
        <h3 className="text-xl font-medium">{job.title}</h3>
        <p className="text-gray-600 mt-2">{job.description}</p>
        {/* Add more job details here as needed */}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Jobs</h2>
      {data?.data.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
