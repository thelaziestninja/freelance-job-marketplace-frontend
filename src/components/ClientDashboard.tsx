// import React, { useState } from "react";
// import JobList from "../components/job/JobList";
// import Profile from "../components/profiles/Profile";
// import { useProfiles } from "../hooks/useProfiles";
// import JobCreationModal from "../components/job/JobCreationModal"; // Assume you have this component
// import ApplicationViewModal from "../components/job/ApplicationViewModal"; // Assume you have this component
// import ReviewModal from "../components/reviews/ReviewModal"; // Assume you have this component
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useProfiles } from "../hooks/useProfiles";
import { useAuth } from "../auth/auth";
// import { logout } from "../auth/authService";

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

  // const { data: profiles } = useProfiles();
  const navigate = useNavigate();
  const { userType } = useAuth();

  useEffect(() => {
    if (userType === "client") {
      navigate("/dashboard");
    }
  }, [userType, navigate]);

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Logout error", error);
  //     // Display error to user (see below for method)
  //   }
  // };

  return (
    <div>
      <h1>Client Dashboard</h1>
    </div>
    // <div className="h-screen bg-custom-pink flex flex-col">
    //   {/* Logout Button */}
    //   <button
    //     className="text-white ml-auto mt-3 mr-3 hover:underline"
    //     onClick={handleLogout}
    //   >
    //     Log out
    //   </button>

    //   {/* Main Content */}
    //   <div className="flex-1 flex bg-custom-pink p-8 shadow-lg space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-custom-coral scrollbar-track-custom-purple">
    //     {/* Jobs you might like */}
    //     <div className="flex-1 bg-dark-pink p-8 overflow-y-auto scrollbar-section">
    //       <div className="overflow-y-auto pr-4">
    //         <JobList />
    //       </div>
    //     </div>

    //     {/* Freelancers */}
    //     <div className="w-64 bg-custom-pink p-8 space-y-4 overflow-y-auto scrollbar-section">
    //       <h2 className="text-2xl font-bold mb-4 text-white ml-auto">
    //         Freelancers
    //       </h2>
    //       <div className="flex flex-col items-center">
    //         {profiles && profiles.data && Array.isArray(profiles.data) ? (
    //           profiles.data.map((profile: ProfileI) => (
    //             <Profile
    //               key={profile._id}
    //               profile={profile}
    //               imageUrl={
    //                 profile.imageUrl ||
    //                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU"
    //               }
    //             />
    //           ))
    //         ) : (
    //           <p>No profiles available</p>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ClientDashboard;
