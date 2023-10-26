import React from "react";
import JobList from "../components/job/JobList";
import { useProfiles } from "../hooks/useProfiles";
import Profile from "../components/profiles/Profile";

const FreelancerDashboard: React.FC = () => {
  const { data: profiles } = useProfiles();

  return (
    <div className="freelancer-dashboard">
      {/* Jobs Section */}
      <div className="jobs-section">
        <JobList />
      </div>

      {/* Freelancers Section */}
      <div className="freelancers-section">
        {profiles && profiles.data && Array.isArray(profiles.data) ? (
          profiles.data.map((profile) => (
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
  );
};

export default FreelancerDashboard;
