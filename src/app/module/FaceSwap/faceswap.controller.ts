import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FaceSwapServices } from "./faceswap.service";

const performFaceSwap = catchAsync(async (req, res) => {
  const payload = {
    image: req.file!,
    celebrity: req.body.celebrity,
  };

  const result = await FaceSwapServices.performFaceSwap(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Face swap completed successfully",
    data: result,
  });
});

export const FaceSwapControllers = {
  performFaceSwap,
};
