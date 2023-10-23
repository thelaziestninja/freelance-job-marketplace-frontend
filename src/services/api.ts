import axios, { AxiosResponse } from "axios";
import { UserI, ProfileI, JobI, ApplicationI, ReviewI } from "../utils/types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Users API
export const getUsers = (): Promise<AxiosResponse<UserI[]>> => {
  return api.get<UserI[]>("/users");
};

// Profiles API
export const getProfiles = (): Promise<AxiosResponse<ProfileI[]>> => {
  return api.get<ProfileI[]>("/profiles");
};

// Jobs API
export const getJobs = (): Promise<AxiosResponse<JobI[]>> => {
  return api.get<JobI[]>("/jobs");
};

// Applications API
export const getApplications = (): Promise<AxiosResponse<ApplicationI[]>> => {
  return api.get<ApplicationI[]>("/applications");
};

// Reviews API
export const getReviews = (): Promise<AxiosResponse<ReviewI[]>> => {
  return api.get<ReviewI[]>("/reviews");
};
