export enum USER_TYPE {
  CLIENT = "client",
  FREELANCER = "freelancer",
}

export type UserType = "freelancer" | "client";

export interface UserI {
  //excluded the hashed password for security reasons
  _id: string;
  username: string;
  email: string;
  user_type: UserType;
}
