import { Model } from "mongoose";

export interface TPollOption {
  text: string;
  votes: number;
}

export interface TPoll {
  id: string;
  question: string;
  options: TPollOption[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TCreatePollRequest {
  question: string;
  options: string[];
}

export interface TCreatePollResponse {
  id: string;
}

export interface TVoteRequest {
  optionIndex: number;
}

export interface PollModel extends Model<TPoll> {
  // Add any static methods here if needed
}
