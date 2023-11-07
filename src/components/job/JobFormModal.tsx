import React, { useState } from "react";
import { useCreateJob } from "../../hooks/useJobs";

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JobFormModal: React.FC<JobFormModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const { mutate: createJob, isLoading, isError, error } = useCreateJob();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Send the form data to the server
    console.log({ title, description, budget, deadline });
    onClose(); // Close the modal after submitting

    const jobData = {
      title,
      description,
      budget: Number(budget),
      deadline: new Date(deadline), // Convert the deadline string to a Date object
    };

    // Call the mutate function to create a new job
    createJob(jobData, {
      onSuccess: () => {
        onClose(); // Close the modal after submitting
        // Reset form fields here if necessary
      },
      onError: (error) => {
        // Log the entire error object for more detailed information
        console.error("Error creating job:", error);
      },
    });
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
