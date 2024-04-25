export interface ReviewI {
  _id: string;
  freelancer_id: string;
  client_id: string;
  rating: number;
  review_text: string;
  timestamp: Date;
}
