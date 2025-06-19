import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PollsControllers } from "./polls.controller";
import { PollsValidation } from "./polls.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(PollsValidation.createPollValidationSchema),
  PollsControllers.createPoll
);

router.get("/:id", PollsControllers.getPollById);

router.post(
  "/:id/vote",
  validateRequest(PollsValidation.voteValidationSchema),
  PollsControllers.voteOnPoll
);

export const PollsRoutes = router;
