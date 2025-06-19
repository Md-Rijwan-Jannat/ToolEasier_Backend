import { Schema, model } from "mongoose";
import { TPoll, PollModel } from "./polls.interface";

const pollOptionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new Schema<TPoll, PollModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [pollOptionSchema],
  },
  {
    timestamps: true,
  }
);

export const Poll = model<TPoll, PollModel>("Poll", pollSchema);
