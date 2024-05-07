import React from "react";
import { ProfileI } from "../../types";
import { observer } from "mobx-react-lite";
import { userStore } from "../../stores/userStore";

interface ProfileProps {
  profile: ProfileI;
}

const Profile: React.FC<ProfileProps> = observer(({ profile }) => {
  return (
    <div className="profile-card flex flex-col items-center">
      <img
        src={profile.imgUrl || userStore.profilePicture}
        alt="Profile Image"
        className="w-24 h-24 rounded-full object-cover"
      />
      <h3 className="mt-0 text-center">{profile.name}</h3>
    </div>
  );
});
export default Profile;
