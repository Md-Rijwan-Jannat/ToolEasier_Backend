import { z } from "zod";

const faceSwapValidationSchema = z.object({
  celebrity: z
    .string({
      required_error: "Celebrity name is required",
      invalid_type_error: "Celebrity must be a string",
    })
    .min(1, { message: "Celebrity name cannot be empty" })
    .max(100, { message: "Celebrity name cannot exceed 100 characters" }),
});

export const FaceSwapValidation = {
  faceSwapValidationSchema,
};
