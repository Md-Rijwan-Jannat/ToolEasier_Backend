import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ParaphraseServices } from "./paraphrase.service";

const paraphraseText = catchAsync(async (req, res) => {
  const result = await ParaphraseServices.paraphraseText(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Text paraphrased successfully",
    data: result,
  });
});

export const ParaphraseControllers = {
  paraphraseText,
};
