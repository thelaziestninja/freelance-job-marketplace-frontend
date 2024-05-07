import { makeAutoObservable } from "mobx";
import {
  createProfile,
  getProfile,
  getProfiles,
  getReviewsByFreelancer,
  registerUser,
  updateProfile,
} from "../services/api";
import {
  ApiError,
  ProfileI,
  ProfileInput,
  RegisterUserDataI,
  ReviewI,
} from "types";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";

class UserStore {
  reviews: ReviewI[] = [];
  isReviewsLoading: boolean = false;
  profiles: ProfileI[] = [];
  isProfilesLoading: boolean = false;
  profile: ProfileI | null = null;
  isProfileLoading: boolean = false;
  profileExists: boolean = false;
  userStoreError: ApiError | null = null;
  profilePicture: string =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU";

  constructor() {
    makeAutoObservable(this);
  }

  loadReviews = async (freelancerId: string): Promise<void> => {
    this.isReviewsLoading = true;
    try {
      const reviews = await getReviewsByFreelancer(freelancerId);
      this.reviews = reviews.data;
    } catch (error: unknown) {
      this.handleApiError(error);
    } finally {
      this.isReviewsLoading = false;
    }
  };

  loadProfile = async (): Promise<void> => {
    this.isProfileLoading = true;
    try {
      const data = await getProfile();
      if (data) {
        this.profile = data;
        this.profilePicture = data.imgUrl || "";
        this.profileExists = !!data;
      }
    } catch (error: unknown) {
      this.handleApiError(error);
    } finally {
      this.isProfileLoading = false;
    }
  };

  loadProfiles = async (): Promise<void> => {
    this.isProfilesLoading = true;
    try {
      const response = await getProfiles();
      this.profiles = response;
    } catch (error: unknown) {
      this.handleApiError(error);
    } finally {
      this.isProfilesLoading = false;
    }
  };

  createProfile = async (profileData: ProfileInput): Promise<void> => {
    try {
      const { data } = await createProfile(profileData);
      this.profile = data;
    } catch (error: unknown) {
      this.handleApiError(error);
    } finally {
      this.loadProfile();
    }
  };

  updateProfile = async (profileData: ProfileInput): Promise<void> => {
    try {
      const { data } = await updateProfile(profileData);
      this.profile = data;
    } catch (error: unknown) {
      this.handleApiError(error);
    } finally {
      this.loadProfile();
    }
  };

  resetProfile = () => {
    this.profile = null;
    this.profilePicture =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU";
    this.isProfileLoading = false;
    this.userStoreError = null;
  };

  register = async (userData: RegisterUserDataI): Promise<void> => {
    try {
      const response = await registerUser(userData);
      console.log("Registration successful", response);
    } catch (error) {
      console.error("Failed to register:", error);
      throw error;
    }
  };

  handleApiError = (error: unknown) => {
    if (isErrorWithMessage(error)) {
      this.userStoreError = {
        message: error.message,
        statusCode: error.statusCode,
      };
    } else {
      this.userStoreError = {
        message: "An unknown error occurred",
      };
    }
  };

  setProfilePicture = (url: string) => {
    this.profilePicture = url;
  };
}
export const userStore = new UserStore();
