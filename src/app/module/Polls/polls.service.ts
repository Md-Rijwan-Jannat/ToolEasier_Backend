import { Poll } from "./polls.model";
import { TCreatePollRequest, TPoll, TVoteRequest } from "./polls.interface";

const createPoll = async (payload: TCreatePollRequest) => {
  const pollId = `poll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const pollData = {
    id: pollId,
    question: payload.question,
    options: payload.options.map((option) => ({
      text: option,
      votes: 0,
    })),
  };

  const result = await Poll.create(pollData);
  return { id: result.id };
};

const getPollById = async (id: string) => {
  const result = await Poll.findOne({ id });
  if (!result) {
    throw new Error("Poll not found");
  }
  return result;
};

const voteOnPoll = async (id: string, payload: TVoteRequest) => {
  const poll = await Poll.findOne({ id });
  if (!poll) {
    throw new Error("Poll not found");
  }

  if (payload.optionIndex < 0 || payload.optionIndex >= poll.options.length) {
    throw new Error("Invalid option index");
  }

  // Increment vote count for the selected option
  poll.options[payload.optionIndex].votes += 1;
  await poll.save();

  return poll;
};

export const PollsServices = {
  createPoll,
  getPollById,
  voteOnPoll,
};
