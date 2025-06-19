import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ParaphraseControllers } from "./paraphrase.controller";
import { ParaphraseValidation } from "./paraphrase.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(ParaphraseValidation.paraphraseValidationSchema),
  ParaphraseControllers.paraphraseText
);

export const ParaphraseRoutes = router;
