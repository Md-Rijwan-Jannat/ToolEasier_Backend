import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUser(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status changed successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.changePassword(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

//Todo. Create necessary controller as par your requirement. You can read my following blog to get deeper understanding about creating different types of route and corresponding controllers for them/ https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeStatus,
  changePassword,
};
