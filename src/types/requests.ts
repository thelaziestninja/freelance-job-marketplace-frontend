import { JobI } from "./job";
import { UserI, UserType } from "./user";

export interface Jobs {
  jobs: JobI[];
}

export interface LoginResponseI {
  message: string;
  token: string;
  user: UserI;
}

export interface RegisterUserDataI {
  username: string;
  email: string;
  password: string;
  user_type: UserType;
}

export interface ProfileInput {
  skills: string[];
  name: string;
  imgUrl?: string;
  description: string;
  hourly_rate: number;
  languages?: string[];
}

export interface CreateJobDataI {
  title: string;
  description: string;
  budget: number;
  deadline: Date;
}
