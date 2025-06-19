import { z } from "zod";

const paraphraseValidationSchema = z.object({
  text: z
    .string({
      required_error: "Text is required",
      invalid_type_error: "Text must be a string",
    })
    .min(1, { message: "Text cannot be empty" })
    .max(1000, { message: "Text cannot exceed 1000 characters" }),
});

export const ParaphraseValidation = {
  paraphraseValidationSchema,
};
