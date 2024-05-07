import { ProfileI } from "../types";
import React, { useState } from "react";
import Profile from "./profiles/Profile";
import { useSelector } from "react-redux";
import JobList from "./job/FreelanceJobList";
import {
  useGetProfileQuery,
  useGetProfilesQuery,
} from "../features/profiles/profilesApiSlice";
import ProfileModal from "./profiles/ProfileModal";
import { Link, useNavigate } from "react-router-dom";
import { selectUserType } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { useGetReviewsQuery } from "../features/reviews/reviewsApiSliceSlice";

const FreelancerDashboard: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileI | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data: profiles } = useGetProfilesQuery();
  const { data: profileData } = useGetProfileQuery();

  // Fetch reviews when a profile is selected
  const { data: reviewsData, isLoading: isLoadingReviews } = useGetReviewsQuery(
    { freelancer_id: selectedProfile?._id || "" },
    { skip: !selectedProfile } // Only run the query when a profile is selected
  );

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

  return (
    <div className="h-screen bg-custom-pink flex flex-col">
      {/* Profile and Logout Buttons */}
      <div className="flex justify-between items-center p-3">
        {/* Profile Picture and My Profile Link */}
        <Link
          to="/profile"
          className="flex items-center space-x-2 hover:underline"
        >
          <img
            src={
              profileData?.imgUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU"
            }
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white">My Profile</span>
        </Link>
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
          <JobList />
        </div>

        {/* Freelancers */}
        <div className="col-span-1 bg-custom-pink p-8 space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">
            Freelancers
          </h2>
          <div className="flex flex-col items-center ">
            {profiles && Array.isArray(profiles.profiles) ? (
              profiles.profiles.map((profile: ProfileI) => (
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
          reviews={reviewsData?.reviews || []} // Fix: Access the 'reviews' property of 'reviewsData' or use an empty array as fallback
          isLoadingReviews={isLoadingReviews}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default FreelancerDashboard;
