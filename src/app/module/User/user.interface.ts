/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user.constant";

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: keyof typeof USER_ROLE;
  status: keyof typeof USER_STATUS;
  isDeleted: boolean;
}

export interface TCreateUserRequest {
  email: string;
  password: string;
  role?: keyof typeof USER_ROLE;
}

export interface TUpdateUserRequest {
  email?: string;
  role?: keyof typeof USER_ROLE;
  status?: keyof typeof USER_STATUS;
}

export interface TChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = keyof typeof USER_STATUS;
