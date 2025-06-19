/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

// Create user
router.post(
  "/",
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser
);

// Get all users
router.get("/", UserControllers.getAllUsers);

// Get user by ID
router.get("/:id", UserControllers.getUserById);

// Update user
router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser
);

// Delete user
router.delete("/:id", UserControllers.deleteUser);

// Change user status
router.patch(
  "/:id/status",
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus
);

// Change password
router.patch(
  "/:id/password",
  validateRequest(UserValidation.changePasswordValidationSchema),
  UserControllers.changePassword
);

export const UserRoutes = router;
