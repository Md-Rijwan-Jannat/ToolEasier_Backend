import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PollsServices } from "./polls.service";

const createPoll = catchAsync(async (req, res) => {
  const result = await PollsServices.createPoll(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Poll created successfully",
    data: result,
  });
});

const getPollById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PollsServices.getPollById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Poll retrieved successfully",
    data: result,
  });
});

const voteOnPoll = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PollsServices.voteOnPoll(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote recorded successfully",
    data: result,
  });
});

export const PollsControllers = {
  createPoll,
  getPollById,
  voteOnPoll,
};
