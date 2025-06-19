/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "./user.model";
import {
  TCreateUserRequest,
  TUpdateUserRequest,
  TChangePasswordRequest,
  TUser,
} from "./user.interface";
import { USER_STATUS } from "./user.constant";

// Todo. Create your own service function to write the business logic.

//You can read my following blog to get deeper understanding about creating different types of service function https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck

const createUser = async (payload: TCreateUserRequest) => {
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const userData = {
    id: userId,
    email: payload.email,
    password: payload.password,
    role: payload.role || "student",
    status: "in-progress" as keyof typeof USER_STATUS,
    needsPasswordChange: true,
    isDeleted: false,
  };

  const result = await User.create(userData);
  return result;
};

const getAllUsers = async () => {
  const result = await User.find({ isDeleted: false }).select("-password");
  return result;
};

const getUserById = async (id: string) => {
  const result = await User.findOne({ id, isDeleted: false }).select(
    "-password"
  );
  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

const updateUser = async (id: string, payload: TUpdateUserRequest) => {
  const result = await User.findOneAndUpdate(
    { id, isDeleted: false },
    payload,
    { new: true, runValidators: true }
  ).select("-password");

  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findOneAndUpdate(
    { id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  ).select("-password");

  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

const changeStatus = async (
  id: string,
  payload: { status: keyof typeof USER_STATUS }
) => {
  const result = await User.findOneAndUpdate(
    { id, isDeleted: false },
    payload,
    { new: true, runValidators: true }
  ).select("-password");

  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

const changePassword = async (id: string, payload: TChangePasswordRequest) => {
  const user = await User.findOne({ id, isDeleted: false }).select("+password");
  if (!user) {
    throw new Error("User not found");
  }

  // Check if current password matches
  const isPasswordMatched = await User.isPasswordMatched(
    payload.currentPassword,
    user.password
  );
  if (!isPasswordMatched) {
    throw new Error("Current password is incorrect");
  }

  // Update password
  user.password = payload.newPassword;
  user.needsPasswordChange = false;
  user.passwordChangedAt = new Date();
  await user.save();

  return { message: "Password changed successfully" };
};

const getUserByEmail = async (email: string) => {
  const result = await User.findOne({ email, isDeleted: false }).select(
    "+password"
  );
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeStatus,
  changePassword,
  getUserByEmail,
};
