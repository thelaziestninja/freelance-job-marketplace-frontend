import React, { useState } from "react";
import { useUser } from "../../context/user/useUserContext";
import { useCreateProfile } from "../../hooks/useProfiles";
import { ProfileInput } from "../../types";

interface ProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileFormModal: React.FC<ProfileFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { profilePicture } = useUser();
  const createProfileMutation = useCreateProfile();

  const [skills, setSkills] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>(profilePicture);
  const [description, setDescription] = useState<string>("");
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [languages, setLanguages] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const skillsArray = skills.split(",").map((skill) => skill.trim());
    const languagesArray = languages
      .split(",")
      .map((language) => language.trim());
    const hourlyRateNumber = parseFloat(hourlyRate);

    const profileData: ProfileInput = {
      skills: skillsArray,
      name,
      imgUrl,
      description,
      hourly_rate: isNaN(hourlyRateNumber) ? 0 : hourlyRateNumber,
      languages: languagesArray,
    };

    try {
      await createProfileMutation.mutateAsync(profileData);
      onClose();
    } catch (error) {
      console.error("Error creating profile", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded w-2/4 max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-lg">
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6">Create/Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <label className="block mb-2">
            Skills (comma separated):
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="border p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Image URL:
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="border p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-1 w-full"
            />
          </label>
          <label className="block mb-2">
            Hourly Rate:
            <input
              type="text"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="border p-1 w-full"
            />
          </label>
          <label className="block mb-4">
            Languages (comma separated):
            <input
              type="text"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              className="border p-1 w-full"
            />
          </label>
          <button
            type="submit"
            className="bg-dark-pink text-white p-2 rounded hover:bg-custom-coral"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileFormModal;
