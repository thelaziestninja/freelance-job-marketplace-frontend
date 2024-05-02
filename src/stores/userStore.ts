import { makeAutoObservable } from "mobx";
import { getProfile, registerUser } from "../services/api";
import { ProfileI, RegisterUserDataI } from "types";

class UserStore {
  profilePicture: string =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4Vvlzhz_mY0fDFrSllG43WpRRoi6JUKNZg&usqp=CAU";
  profile: ProfileI | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadProfile() {
    try {
      const data = await getProfile();
      if (data) {
        this.profile = data;
        this.profilePicture = data.imgUrl || "";
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  }

  setProfilePicture = (url: string) => {
    this.profilePicture = url;
  };

  async register(userData: RegisterUserDataI) {
    try {
      const response = await registerUser(userData);
      console.log("Registration successful", response);
    } catch (error) {
      console.error("Failed to register:", error);
      throw error;
    }
  }
}

export const userStore = new UserStore();
