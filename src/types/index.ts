export type UserType = "freelancer" | "client";

export interface UserI {
  //excluded the hashed password for security reasons
  _id: string;
  username: string;
  email: string;
  user_type: UserType;
}

export interface LoginResponseI {
  message: string;
  token: string;
  user: UserI;
}

export enum USER_TYPE {
  CLIENT = "client",
  FREELANCER = "freelancer",
}

export interface RegisterUserDataI {
  username: string;
  email: string;
  password: string;
  user_type: UserType;
}

export interface ProfileI {
  _id: string;
  user: string;
  name: string;
  skills: string[];
  description: string;
  hourly_rate: number;
  languages?: string[];
  imgUrl?: string;
}

export interface ProfileInput {
  skills: string[];
  name: string;
  imgUrl?: string;
  description: string;
  hourly_rate: number;
  languages?: string[];
}

export interface JobI {
  _id: string;
  client_id: string;
  title: string;
  description: string;
  budget: number;
  deadline: Date;
}

export interface JobsResponse {
  jobs: {
    jobs: JobI[];
  };
}

export interface ApplicationI {
  _id: string;
  job_id: string;
  freelancer_id: string;
  cover_letter: string;
  timestamp: Date;
}

export interface ReviewI {
  _id: string;
  freelancer_id: string;
  client_id: string;
  rating: number;
  review_text: string;
  timestamp: Date;
}
