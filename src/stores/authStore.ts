import { userStore } from "./userStore";
import { makeAutoObservable } from "mobx";
import * as AuthService from "../services/auth/authService";

class AuthStore {
  isAuthenticated = false;
  token: string | undefined = undefined;
  userType: "client" | "freelancer" | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.loadInitialAuthState();
  }

  loadInitialAuthState = async () => {
    this.token = sessionStorage.getItem("token") || undefined;
    this.userType =
      (sessionStorage.getItem("userType") as "client" | "freelancer") ||
      undefined;
    this.isAuthenticated = !!this.token;
  };

  login = async (username: string, password: string): Promise<void> => {
    const data = await AuthService.login(username, password);
    this.token = data.token;
    this.userType = data.userType;
    this.isAuthenticated = true;
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userType", data.userType);
  };

  logout = async (): Promise<void> => {
    try {
      await AuthService.logout();
      this.token = undefined;
      this.userType = undefined;
      this.isAuthenticated = false;
      userStore.resetProfile();
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userType");
    } catch (error) {
      console.error("Logout error", error);
    }
  };
}

export const authStore = new AuthStore();
