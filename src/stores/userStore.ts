import { makeAutoObservable } from "mobx";
import { getProfile, getProfiles, registerUser } from "../services/api";
import { ApiError, ProfileI, RegisterUserDataI } from "types";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";

class UserStore {
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
    } finally {
      this.isProfilesLoading = false;
    }
  };

  setProfilePicture = (url: string) => {
    this.profilePicture = url;
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
}

export const userStore = new UserStore();
