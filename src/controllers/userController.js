// Standard response function

import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from "../models/userModel";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 201, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserService(id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 201, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const id = req.params.id;
    const user = await updateUserService(id, name, email);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 201, "Users updated successfully", user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await deleteUserService(id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 201, "User deleted successfully", user);
  } catch (error) {
    next(error);
  }
};
