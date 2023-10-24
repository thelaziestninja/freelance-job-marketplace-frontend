import React from "react";
import { ProfileI } from "../../utils/types";

interface ProfileProps {
  profile: ProfileI;
  imageUrl?: string;
}

const Profile: React.FC<ProfileProps> = ({ profile, imageUrl }) => {
  const placeholderImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU";

  return (
    <div className="profile-card">
      <img src={imageUrl || placeholderImageUrl} alt="Profile Image" />
      <h3>{profile.user}</h3>
      {/* Render other profile information */}
    </div>
  );
};

export default Profile;
