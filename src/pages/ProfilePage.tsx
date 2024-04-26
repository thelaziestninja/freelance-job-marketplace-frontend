import { ProfileI } from "../types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCheckProfileExistsQuery,
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../features/profiles/profilesApiSlice";
import ProfileFormModal from "../components/profiles/ProfileFormModal";
import { selectProfilePicture } from "../features/profiles/profileSlice";

export const ProfilePage: React.FC = () => {
  const profilePicture = useSelector(selectProfilePicture);
  const [isProfileFormModalOpen, setIsProfileFormModalOpen] = useState(false);

  const { data: profileData, isLoading: isLoadingProfile } =
    useGetProfileQuery();
  const { data: existenceData, isLoading: isLoadingExistence } =
    useCheckProfileExistsQuery();

  const [createProfile] = useCreateProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();

  // const user = useSelector(selectUser); // If you need user details
  const openProfileFormModal = () => {
    setIsProfileFormModalOpen(true);
  };

  const closeProfileFormModal = () => {
    setIsProfileFormModalOpen(false);
  };

  const handleProfileSave = async (profile: ProfileI) => {
    if (existenceData?.exists) {
      await updateProfile(profile);
    } else {
      await createProfile(profile);
    }
    closeProfileFormModal();
  };

  if (isLoadingExistence || isLoadingProfile) {
    return <div>Loading...</div>;
  }
  const profileExists = existenceData?.exists ?? false;

  return (
    <div className="h-screen bg-custom-pink flex justify-center items-center p-8">
      {/* Profile Form Modal */}
      <ProfileFormModal
        isOpen={isProfileFormModalOpen}
        onClose={closeProfileFormModal}
        profile={profileData}
        onSave={handleProfileSave}
      />

      {/* Main Content */}
      <div className="w-full max-w-screen-md bg-white p-8 rounded-lg shadow-md flex flex-col items-center space-y-8">
        {/* User Profile Photo */}
        <img
          src={profileData?.imgUrl || profilePicture}
          alt="Profile"
          className="w-48 h-48 rounded-full"
          onError={(e) => console.error("Error loading image:", e)}
        />

        {/* User Description */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {profileData?.name || "User Name"}
          </h2>
          <p className="text-gray-600">
            {profileData?.description ||
              "This is a brief description about the user. It can talk about their skills, experiences, and any other relevant information."}
          </p>
        </div>

        {/* Conditional Button */}
        {profileExists ? (
          <button
            onClick={openProfileFormModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={openProfileFormModal}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          >
            Create Profile
          </button>
        )}
      </div>
    </div>
  );
};
