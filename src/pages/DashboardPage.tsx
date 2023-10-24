import React from "react";
import JobList from "../components/job/JobList";
import { logout } from "../auth/authService";
import { useNavigate } from "react-router-dom";
import { useProfiles } from "../hooks/useProfiles";
import Profile from "../components/profiles/Profile";
import { ProfileI } from "../types";

const DashboardPage: React.FC = () => {
  const { data: profiles } = useProfiles();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error", error);
      // Display error to user (see below for method)
    }
  };
  console.log("Profiles:", profiles);

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
      <div className="flex-1 flex bg-custom-pink p-8 shadow-lg space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-custom-coral scrollbar-track-custom-purple">
        {/* Jobs you might like */}
        <div className="flex-1 bg-dark-pink p-8 overflow-y-auto scrollbar-section">
          <div className="overflow-y-auto pr-4">
            <JobList />
          </div>
        </div>

        {/* Freelancers */}
        <div className="w-64 bg-custom-pink p-8 space-y-4 overflow-y-auto scrollbar-section">
          <h2 className="text-2xl font-bold mb-4 text-white ml-auto">
            Freelancers
          </h2>
          <div className="flex flex-col items-center">
            {profiles && profiles.data && Array.isArray(profiles.data) ? (
              profiles.data.map((profile: ProfileI) => (
                <Profile
                  key={profile._id}
                  profile={profile}
                  imageUrl={
                    profile.imageUrl ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU"
                  }
                />
              ))
            ) : (
              <p>No profiles available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
