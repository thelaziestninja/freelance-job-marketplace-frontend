import React, { useEffect, useState } from "react";
import { logout } from "../auth/authService";
import { useNavigate } from "react-router-dom";
import { useProfiles } from "../hooks/useProfiles";
import JobList from "./job/FreelanceJobList";
import { ProfileI } from "../types";
import Profile from "./profiles/Profile";
import { useAuth } from "../auth/auth";
import ProfileModal from "./profiles/ProfileModal";
import { useReviewsByFreelancer } from "../hooks/useReviews";

const FreelancerDashboard: React.FC = () => {
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
      {/* Logout Button */}
      <button
        className="text-white ml-auto mt-3 mr-3 hover:underline"
        onClick={handleLogout}
      >
        Log out
      </button>

      {/* Main Content */}
      <div className="grid grid-cols-5 bg-custom-pink p-8 overflow-auto">
        {/* Jobs you might like */}
        <div className="col-span-4 bg-dark-pink p-8 rounded-lg">
          <JobList />
        </div>

        {/* Freelancers */}
        <div className="col-span-1 bg-custom-pink p-8 space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-white ml-auto">
            Freelancers
          </h2>
          <div className="flex flex-col items-center ">
            {profiles && Array.isArray(profiles) ? (
              profiles.map((profile: ProfileI) => (
                <div
                  key={profile._id}
                  onClick={() => handleProfileClick(profile)}
                >
                  <Profile
                    profile={profile}
                    imageUrl={
                      profile.imageUrl ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU"
                    }
                  />
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
