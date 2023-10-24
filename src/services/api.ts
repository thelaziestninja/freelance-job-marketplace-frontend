import axios, { AxiosResponse } from "axios";
import {
  UserI,
  ProfileI,
  JobI,
  ApplicationI,
  ReviewI,
  JobsResponse,
} from "../utils/types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Users API
export const getUsers = (): Promise<AxiosResponse<UserI[]>> => {
  return api.get<UserI[]>("/users");
};

// Profiles API
export const getProfiles = (): Promise<AxiosResponse<ProfileI[]>> => {
  return api.get<ProfileI[]>("/profiles");
};

// Jobs API
export const getJobs = async (): Promise<JobsResponse> => {
  const response = await api.get<{ jobs: JobI[] }>("/jobs");
  return { jobs: response.data };
};

// Applications API
export const getApplications = (): Promise<AxiosResponse<ApplicationI[]>> => {
  return api.get<ApplicationI[]>("/applications");
};

// Reviews API
export const getReviews = (): Promise<AxiosResponse<ReviewI[]>> => {
  return api.get<ReviewI[]>("/reviews");
};
