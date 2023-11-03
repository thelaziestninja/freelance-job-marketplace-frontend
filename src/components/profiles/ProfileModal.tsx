import React from "react";
import { ProfileI, ReviewI } from "../../types";

interface ProfileModalProps {
  profile: ProfileI;
  reviews: ReviewI[];
  isLoadingReviews: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  reviews,
  isOpen,
  onClose,
}) => {
  // console.log("Reviews in Modal:", reviews);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-dark-pink p-6 rounded-lg w-full max-w-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-custom-coral p-2 rounded-full hover:bg-red-700 transition-colors"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="flex">
          <img
            src={
              profile.imgUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU"
            }
            alt={profile.user}
            className="rounded-full w-28 h-28"
          />
          <div className="ml-6">
            <h3 className="text-2xl font-bold">{profile.name}</h3>
            <p className="text-lg">{profile.description}</p>
            <h3 className="font-bold">{profile.hourly_rate}$ per hour</h3>
            <div>
              <h4 className="font-bold">Skills:</h4>
              <ul>
                {profile.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Reviews:</h4>
              <ul>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <li key={review._id}>{review.review_text}</li>
                  ))
                ) : (
                  <li>No reviews found for this freelancer</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
