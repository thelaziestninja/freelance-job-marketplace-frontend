import {
  UserI,
  ProfileI,
  JobI,
  ApplicationI,
  ReviewI,
  JobsResponse,
  RegisterUserDataI,
  ProfileInput,
} from "../types";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

//Debug Token During API Calls
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    // console.log("Token before API call in api.ts:", token);
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

export const registerUser = async (userData: RegisterUserDataI) => {
  const response = await api.post("/user/register", userData);
  return response.data;
};

// Profiles API
export const getProfiles = async (): Promise<AxiosResponse<ProfileI[]>> => {
  const response = await api.get("/profiles");
  return response.data.profiles;
};

export const getProfile = async (): Promise<ProfileI> => {
  const response = await api.get<{ profile: ProfileI }>("/profile");
  return response.data.profile;
};

export const checkProfileExists = async (): Promise<
  AxiosResponse<{ exists: boolean }>
> => {
  return api.get<{ exists: boolean }>("/profile/exists");
};

export const createProfile = async (
  profileData: ProfileInput
): Promise<AxiosResponse<ProfileI>> => {
  return api.post<ProfileI>("/profile", profileData);
};

export const updateProfile = async (
  profileData: ProfileInput
): Promise<AxiosResponse<ProfileI>> => {
  return api.put<ProfileI>("/profile", profileData);
};

// Jobs API
export const getJobs = async (): Promise<JobsResponse> => {
  const response = await api.get<{ jobs: JobI[] }>("/jobs");
  return { jobs: response.data };
};

// Applications API
export const getApplications = async (): Promise<
  AxiosResponse<ApplicationI[]>
> => {
  return api.get<ApplicationI[]>("/applications");
};

export const createApplication = async (
  jobId: string,
  coverLetter: string
): Promise<AxiosResponse<ApplicationI>> => {
  return api.post<ApplicationI>(`/job/${jobId}/apply`, {
    cover_letter: coverLetter,
  });
};

// Reviews API
export const getReviewsByFreelancer = (
  freelancerId: string
): Promise<AxiosResponse<ReviewI[]>> => {
  return api.get<ReviewI[]>(`/profile/${freelancerId}/reviews`);
};
