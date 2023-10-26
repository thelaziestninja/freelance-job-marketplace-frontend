// import React, { useState } from "react";
// import JobList from "../components/job/JobList";
// import Profile from "../components/profiles/Profile";
// import { useProfiles } from "../hooks/useProfiles";
// import JobCreationModal from "../components/job/JobCreationModal"; // Assume you have this component
// import ApplicationViewModal from "../components/job/ApplicationViewModal"; // Assume you have this component
// import ReviewModal from "../components/reviews/ReviewModal"; // Assume you have this component

const ClientDashboard: React.FC = () => {
  //   const { data: profiles } = useProfiles();
  //   const [isJobCreationModalOpen, setIsJobCreationModalOpen] = useState(false);
  //   const [isApplicationViewModalOpen, setIsApplicationViewModalOpen] =
  //     useState(false);
  //   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  //   const handleJobCreationModalToggle = () => {
  //     setIsJobCreationModalOpen((prev) => !prev);
  //   };

  //   const handleApplicationViewModalToggle = () => {
  //     setIsApplicationViewModalOpen((prev) => !prev);
  //   };

  //   const handleReviewModalToggle = () => {
  //     setIsReviewModalOpen((prev) => !prev);

  return (
    <div>
      <h1>Client Dashboard</h1>
    </div>
    // <div className="client-dashboard">
    //   {/* Job Creation Button */}
    //   <button onClick={handleJobCreationModalToggle}>Post New Job</button>

    //   Jobs Section
    //   <div className="jobs-section">
    //     <JobList onViewApplications={handleApplicationViewModalToggle} />
    //   </div>

    //   {/* Freelancers Section */}
    //   <div className="freelancers-section">
    //     {profiles && profiles.data && Array.isArray(profiles.data) ? (
    //       profiles.data.map((profile) => (
    //         <Profile
    //           key={profile._id}
    //           profile={profile}
    //           onReview={handleReviewModalToggle}
    //           imageUrl={
    //             profile.imageUrl ||
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU"
    //           }
    //         />
    //       ))
    //     ) : (
    //       <p>No profiles available</p>
    //     )}
    //   </div>

    //   {/* Modals */}
    //   {isJobCreationModalOpen && (
    //     <JobCreationModal onClose={handleJobCreationModalToggle} />
    //   )}
    //   {isApplicationViewModalOpen && (
    //     <ApplicationViewModal onClose={handleApplicationViewModalToggle} />
    //   )}
    //   {isReviewModalOpen && <ReviewModal onClose={handleReviewModalToggle} />}
    // </div>
  );
};

export default ClientDashboard;
