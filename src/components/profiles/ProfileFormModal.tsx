import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  useCreateProfileMutation,
  useUpdateProfileMutation,
} from "../../features/profiles/profilesApiSlice";
import React, { useEffect, useState } from "react";
import { ProfileI, CteateProfileData } from "../../types";

interface ProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: ProfileI;
  onSave?: (profile: ProfileI) => void;
}

const ProfileFormModal: React.FC<ProfileFormModalProps> = ({
  isOpen,
  onClose,
  profile,
  // onUpdateProfile,
}) => {
  const profilePicture = useSelector(
    (state: RootState) => state.profile.profilePicture
  );
  const [createProfileMutation] = useCreateProfileMutation();
  const [updateProfileMutation] = useUpdateProfileMutation();

  const [formState, setFormState] = useState<CteateProfileData>({
    skills: [],
    name: "",
    imgUrl: profilePicture,
    description: "",
    hourly_rate: 0,
    languages: [],
  });

  useEffect(() => {
    if (profile) {
      setFormState({
        skills: profile.skills,
        name: profile.name,
        imgUrl: profile.imgUrl || profilePicture,
        description: profile.description,
        hourly_rate: profile.hourly_rate,
        languages: profile.languages || [],
      });
    }
  }, [profile, profilePicture]);

  const handleChange =
    (field: keyof CteateProfileData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState({ ...formState, [field]: event.target.value });
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (profile) {
        await updateProfileMutation({ ...profile, ...formState });
      } else {
        await createProfileMutation(formState).unwrap();
      }
      onClose();
      //here we need to invalidate the queries
    } catch (error) {
      console.error("Error saving profile", error);
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
          {/* Skills */}
          <label className="block mb-2">
            Skills (comma separated):
            <input
              type="text"
              value={formState.skills.join(", ")}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="border p-1 w-full"
            />
          </label>

          {/* Name */}
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={formState.name}
              onChange={handleChange("name")}
              className="border p-1 w-full"
            />
          </label>

          {/* Image URL */}
          <label className="block mb-2">
            Image URL:
            <input
              type="text"
              value={formState.imgUrl}
              onChange={handleChange("imgUrl")}
              className="border p-1 w-full"
            />
          </label>

          {/* Description */}
          <label className="block mb-2">
            Description:
            <textarea
              value={formState.description}
              onChange={handleChange("description")}
              className="border p-1 w-full"
            />
          </label>

          {/* Hourly Rate */}
          <label className="block mb-2">
            Hourly Rate:
            <input
              type="number"
              value={formState.hourly_rate}
              onChange={handleChange("hourly_rate")}
              className="border p-1 w-full"
            />
          </label>

          {/* Languages */}
          <label className="block mb-4">
            Languages (comma separated):
            <input
              type="text"
              value={formState.languages?.join(", ") || ""}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  languages: e.target.value.split(",").map((s) => s.trim()),
                })
              }
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
