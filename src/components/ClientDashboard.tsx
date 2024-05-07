import { ProfileI } from "../types";
import { Link } from "react-router-dom";
import Profile from "./profiles/Profile";
import { observer } from "mobx-react-lite";
import JobFormModal from "./job/JobFormModal";
import FloatingActionButton from "./UI/Button";
import { useNavigate } from "react-router-dom";
import ClientJobList from "./job/ClientJobList";
import { authStore } from "../stores/authStore";
import { userStore } from "../stores/userStore";
import ProfileModal from "./profiles/ProfileModal";
import React, { useEffect, useState } from "react";
import { logout } from "../services/auth/authService";

const ClientDashboard: React.FC = observer(() => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileI | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.userType === "freelancer") {
      navigate("/login");
    }
    if (userStore.profiles.length === 0) {
      userStore.loadProfiles();
    }
    if (userStore.profile?._id) {
      userStore.loadReviews(userStore.profile._id);
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
            {userStore.profiles && Array.isArray(userStore.profiles) ? (
              userStore.profiles.map((profile: ProfileI) => (
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
          reviews={userStore.reviews}
          isLoadingReviews={userStore.isReviewsLoading}
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
