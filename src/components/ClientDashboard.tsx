import { ProfileI } from "../types";
import React, { useState } from "react";
import Profile from "./profiles/Profile";
import { useSelector } from "react-redux";
import JobFormModal from "./job/JobFormModal";
import FloatingActionButton from "./UI/Button";
import ClientJobList from "./job/ClientJobList";
import ProfileModal from "./profiles/ProfileModal";
import { Link, useNavigate } from "react-router-dom";
import { selectUserType } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { useGetReviewsQuery } from "../features/reviews/reviewsApiSliceSlice";
import { useGetProfilesQuery } from "../features/profiles/profilesApiSlice";

const ClientDashboard: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileI | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const navigate = useNavigate();

  const { data: profiles, refetch } = useGetProfilesQuery();
  const { data: reviewsData, isLoading: isLoadingReviews } =
    useGetReviewsQuery();

  const [logout] = useLogoutMutation();

  const userType = useSelector(selectUserType);

  const handleLogout = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (logout as any)().unwrap();

      console.log("User type after logout:", userType);
      navigate("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleProfileClick = (profile: ProfileI) => {
    setSelectedProfile(profile);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const openJobForm = () => {
    setIsJobFormOpen(true);
  };

  const closeJobForm = () => {
    setIsJobFormOpen(false);
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <div className="h-screen bg-custom-pink flex flex-col">
      {/* Links and Logout Button */}
      <div className="flex justify-between items-center p-3">
        {/* View Applications Link */}
        <Link
          to="/applications"
          className="flex items-center space-x-2 hover:underline"
        >
          <span className="text-white">View Applications</span>
        </Link>

        {/* Logout Button */}
        <button
          className="text-white ml-auto mt-3 mr-3 hover:underline"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 bg-custom-pink p-8 overflow-auto">
        {/* All jobs*/}
        <div className="col-span-4 bg-dark-pink p-8 rounded-lg">
          <ClientJobList />
        </div>

        {/* Freelancers */}
        <div className="col-span-1 bg-custom-pink p-8 space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">
            Freelancers
          </h2>
          <div className="flex flex-col items-center ">
            {profiles && Array.isArray(profiles) ? (
              profiles.map((profile: ProfileI) => (
                <div
                  key={profile._id}
                  onClick={() => handleProfileClick(profile)}
                >
                  <Profile profile={profile} />
                </div>
              ))
            ) : (
              <p>No profiles available</p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          reviews={reviewsData || []}
          isLoadingReviews={isLoadingReviews}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      )}
      <FloatingActionButton onClick={openJobForm} />
      <JobFormModal
        isOpen={isJobFormOpen}
        onClose={closeJobForm}
        onJobCreated={handleRefetch}
      />
    </div>
  );
};

export default ClientDashboard;
