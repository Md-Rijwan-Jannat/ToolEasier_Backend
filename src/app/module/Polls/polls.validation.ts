import { z } from "zod";

const createPollValidationSchema = z.object({
  question: z
    .string({
      required_error: "Question is required",
      invalid_type_error: "Question must be a string",
    })
    .min(1, { message: "Question cannot be empty" })
    .max(500, { message: "Question cannot exceed 500 characters" }),
  options: z
    .array(
      z
        .string({
          required_error: "Option text is required",
          invalid_type_error: "Option must be a string",
        })
        .min(1, { message: "Option cannot be empty" })
    )
    .min(2, { message: "At least 2 options are required" })
    .max(10, { message: "Maximum 10 options allowed" }),
});

const voteValidationSchema = z.object({
  optionIndex: z
    .number({
      required_error: "Option index is required",
      invalid_type_error: "Option index must be a number",
    })
    .int({ message: "Option index must be an integer" })
    .min(0, { message: "Option index must be non-negative" }),
});

export const PollsValidation = {
  createPollValidationSchema,
  voteValidationSchema,
};
