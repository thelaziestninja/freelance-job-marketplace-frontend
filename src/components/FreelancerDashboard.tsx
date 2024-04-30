import { ProfileI } from "../types";
import { Link } from "react-router-dom";
import Profile from "./profiles/Profile";
import JobList from "./job/FreelanceJobList";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./profiles/ProfileModal";
import React, { useEffect, useState } from "react";
import { useReviewsByFreelancer } from "../hooks/useReviews";
import { useProfile } from "../hooks/useProfiles";
import { authAtom, logoutAtom } from "../state/authAtoms";
import { useAtom } from "jotai";
import { userAtom } from "../state/userAtoms";

const FreelancerDashboard: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileI | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: reviewsData, isLoading: isLoadingReviews } =
    useReviewsByFreelancer(selectedProfile?._id ?? "");
  const reviews = reviewsData?.data ?? [];
  const navigate = useNavigate();
  const [{ userType }] = useAtom(authAtom);
  const [{ profilePicture }] = useAtom(userAtom);
  const [, logout] = useAtom(logoutAtom);
  const { data: profiles } = useProfile();
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (userType === "client") {
      navigate("/login");
    }
  }, [userType, navigate]);

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
      {/* Profile Button and Logout Button */}
      <div className="flex justify-between items-center p-3">
        {/* Profile Picture and My Profile Link */}
        <Link
          to="/profile"
          className="flex items-center space-x-2 hover:underline"
        >
          <img
            src={profileData?.imgUrl || profilePicture}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
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
          <JobList />
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

export default FreelancerDashboard;
