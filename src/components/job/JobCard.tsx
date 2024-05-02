import { JobI } from "../../types";
import { useApplyJob } from "../../hooks/useApplication";
import React, { useState, useRef, useEffect } from "react";

const JobCard: React.FC<{ job: JobI }> = ({ job }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const applyJob = useApplyJob();
  const applyBoxRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement; // Explicit type assertion
    if (applyBoxRef.current && !applyBoxRef.current.contains(target)) {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApplyNow = async () => {
    try {
      await applyJob.mutateAsync({ jobId: job._id, coverLetter });
      alert("Application submitted successfully!");
      setIsApplying(false);
      setCoverLetter("");
    } catch (error) {
      alert("Failed to submit application. Please try again later.");
      console.error("Application submission error:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold">{job.title}</h3>
      <p className="text-gray-1500 mt-2">{job.description}</p>
      <div className="mt-4 flex justify-end space-x-4">
        {isApplying ? (
          <div ref={applyBoxRef} className="flex space-x-16 w-full">
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write your cover letter here..."
              className="p-2 border rounded w-3/4"
            />
            <button
              className="bg-custom-coral text-white px-1 py-1 rounded w-1/6"
              onClick={handleApplyNow}
            >
              Apply
            </button>
          </div>
        ) : (
          <>
            <button
              className="bg-custom-coral text-white px-1 py-1 rounded w-1/6"
              onClick={() => setIsApplying(true)}
            >
              Apply Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
