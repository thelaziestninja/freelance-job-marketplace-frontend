import React from "react";
import { ProfileI } from "../../types";

interface ProfileProps {
  profile: ProfileI;
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const placeholderImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU";

  return (
    <div className="profile-card flex flex-col items-center">
      <img
        src={profile.imgUrl || placeholderImageUrl}
        alt="Profile Image"
        className="w-24 h-24 rounded-full object-cover" // Added rounded-full and object-cover classes
      />
      <h3 className="mt-0 text-center">{profile.name}</h3>
    </div>
  );
};
export default Profile;
