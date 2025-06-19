import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { upload } from "../../utils/sendImageToCloudinary";
import { FaceSwapControllers } from "./faceswap.controller";
import { FaceSwapValidation } from "./faceswap.validation";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  validateRequest(FaceSwapValidation.faceSwapValidationSchema),
  FaceSwapControllers.performFaceSwap
);

export const FaceSwapRoutes = router;
