import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import ClientJobList from "./job/ClientJobList";
import { ProfileI } from "../types";
import Profile from "./profiles/Profile";
import { logout } from "../auth/authService";
import { useProfiles } from "../hooks/useProfiles";
import { useReviewsByFreelancer } from "../hooks/useReviews";
import ProfileModal from "./profiles/ProfileModal";
import { Link } from "react-router-dom";

const ClientDashboard: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileI | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: reviewsData, isLoading: isLoadingReviews } =
    useReviewsByFreelancer(selectedProfile?._id ?? "");
  const reviews = reviewsData?.data ?? [];
  const navigate = useNavigate();
  const { userType } = useAuth();
  const { data: profiles } = useProfiles();

  // console.log("Reviews:", reviews);

  useEffect(() => {
    if (userType === "client") {
      navigate("/login");
    }
  }, [userType, navigate, profiles]);

  const handleLogout = async () => {
    try {
      await logout();
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

  return (
    <div className="h-screen bg-custom-pink flex flex-col">
      {/* Profile Button */}
      <div className="flex justify-between items-center p-3">
        <Link
          to="/profile"
          className="flex items-center space-x-2 hover:underline"
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>{" "}
          {/* This is a placeholder for the user's profile picture */}
          <span className="text-white">My Profile</span>
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
        {/* Jobs you might like */}
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
    </div>
  );
};

export default ClientDashboard;
