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
