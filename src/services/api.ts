import {
  UserI,
  ProfileI,
  JobI,
  ApplicationI,
  ReviewI,
  JobsResponse,
  RegisterUserDataI,
  CteateProfileData,
  CreateJobDataI,
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
export const getProfiles = async (): Promise<ProfileI[]> => {
  const response = await api.get<{ profiles: ProfileI[] }>("/profiles");
  return response.data.profiles; // Return just the profiles array
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
  profileData: CteateProfileData
): Promise<AxiosResponse<ProfileI>> => {
  return api.post<ProfileI>("/profile", profileData);
};

export const updateProfile = async (
  profileData: CteateProfileData
): Promise<AxiosResponse<ProfileI>> => {
  return api.put<ProfileI>("/profile", profileData);
};

// Jobs API
export const getJobs = async (): Promise<JobsResponse> => {
  const response = await api.get<JobI[]>("/jobs");
  return { jobs: response.data };
};

export const getMyJobs = async (): Promise<JobI[]> => {
  const response = await api.get<JobI[]>("/my-jobs");
  return response.data;
};

export const createJob = async (jobData: CreateJobDataI): Promise<JobI> => {
  const response = await api.post<JobI>("/job", jobData);
  return response.data;
};

// Applications API
export const getApplications = async (
  jobId: string
): Promise<ApplicationI[]> => {
  const response = await api.get<ApplicationI[]>(`/job/${jobId}/applications`);
  return response.data; // Return just the data, not the whole response
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
