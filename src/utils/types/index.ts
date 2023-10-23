export type UserType = "freelancer" | "client";

export interface UserI {
  //excluded the hashed password for security reasons
  id: string;
  username: string;
  email: string;
  user_type: UserType;
}

export interface ProfileI {
  id: string;
  user: string;
  skills: string[];
  description: string;
  hourly_rate: number;
  languages?: string[];
}

export interface JobI {
  id: string;
  client_id: string;
  title: string;
  description: string;
  budget: number;
  deadline: Date;
}

export interface ApplicationI {
  id: string;
  job_id: string;
  freelancer_id: string;
  cover_letter: string;
  timestamp: Date;
}

export interface ReviewI {
  id: string;
  freelancer_id: string;
  client_id: string;
  rating: number;
  review_text: string;
  timestamp: Date;
}
