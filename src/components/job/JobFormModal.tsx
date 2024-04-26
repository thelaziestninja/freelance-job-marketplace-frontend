import React, { useState } from "react";
import { useCreateJobMutation } from "../../features/jobs/jobsSlice";
import { isFetchBaseQueryError } from "../../utils/isFetchBaseError";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: () => void;
}

const JobFormModal: React.FC<JobFormModalProps> = ({
  isOpen,
  onClose,
  onJobCreated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const [createJob, { isLoading, isError, error }] = useCreateJobMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const jobData = {
      title,
      description,
      budget: Number(budget),
      deadline: new Date(deadline),
    };

    try {
      // unwrap the result to handle it as a promise
      await createJob(jobData).unwrap();
      setTitle("");
      setDescription("");
      setBudget("");
      setDeadline("");
      // Handle success
      alert("Job created successfully!");
      onJobCreated();
      onClose();
    } catch (error) {
      if (isFetchBaseQueryError(error as FetchBaseQueryError)) {
        const fetchError = error as FetchBaseQueryError; // Explicitly type 'error' as 'FetchBaseQueryError'
        // Handle the error from the server
        console.error(`Error ${fetchError.status}: ${fetchError.data}`);
      } else {
        // Handle client error
        console.error("Error creating job:", error);
      }
    }
  };

  if (!isOpen) return null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded w-2/4 h-2/4 max-w-2xl max-h-2xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent onClick from triggering when clicking inside the modal
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-lg">
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6">Create a New Job</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Budget:
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="border p-1 w-full"
            />
          </label>
          <label className="block mb-4">
            Deadline:
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border p-1 w-full"
            />
          </label>
          <button
            type="submit"
            className="bg-dark-pink text-white p-2 rounded hover:bg-custom-coral"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobFormModal;
