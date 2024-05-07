import { ProfileI } from "../types";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Profile from "./profiles/Profile";
import { observer } from "mobx-react-lite";
import JobFormModal from "./job/JobFormModal";
import { useNavigate } from "react-router-dom";
import FloatingActionButton from "./UI/Button";
import ClientJobList from "./job/ClientJobList";
import { authStore } from "../stores/authStore";
import { userStore } from "../stores/userStore";
import ProfileModal from "./profiles/ProfileModal";
import { logout } from "../services/auth/authService";
import { useReviewsByFreelancer } from "../hooks/useReviews";

const ClientDashboard: React.FC = observer(() => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileI | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const { data: reviewsData, isLoading: isLoadingReviews } =
    useReviewsByFreelancer(selectedProfile?._id ?? "");
  const reviews = reviewsData?.data ?? [];
  const navigate = useNavigate();
  const { profiles } = userStore;

  useEffect(() => {
    if (authStore.userType === "freelancer") {
      navigate("/login");
    }
    if (userStore.profiles.length === 0) {
      userStore.loadProfiles();
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User type after logout:", authStore.userType);
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
          reviews={reviews}
          isLoadingReviews={isLoadingReviews}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      )}
      <FloatingActionButton onClick={openJobForm} />
      <JobFormModal isOpen={isJobFormOpen} onClose={closeJobForm} />
    </div>
  );
});

export default ClientDashboard;
