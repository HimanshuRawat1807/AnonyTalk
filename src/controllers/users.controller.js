import mongoose from "mongoose";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !username.trim()) {
    throw new ApiError(400, "Username is required");
  }

  if (!email || !email.trim()) {
    throw new ApiError(400, "Email is required");
  }

  if (!password || !password.trim()) {
    throw new ApiError(400, "Password is required");
  }

  const existingUser = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists with this email");
  }

  const user = await User.create({
    username: username.trim(),
    email: email.trim().toLowerCase(),
    password: password.trim(),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    throw new ApiError(400, "Email is required");
  }

  if (!password || !password.trim()) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.password !== password.trim()) {
    throw new ApiError(401, "Invalid credentials");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User logged in successfully"));
});


// create user
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !username.trim()) {
    throw new ApiError(400, "Username is required");
  }

  if (!email || !email.trim()) {
    throw new ApiError(400, "Email is required");
  }

  if (!password || !password.trim()) {
    throw new ApiError(400, "Password is required");
  }

  const existingUser = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists with this email");
  }

  const user = await User.create({
    username: username.trim(),
    email: email.trim().toLowerCase(),
    password: password.trim(),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User created successfully"));
});

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});


// single user controller 
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email, password, isVerified } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user id");
  }

  const updateData = {};

  if (username && username.trim()) {
    updateData.username = username.trim();
  }

  if (email && email.trim()) {
    updateData.email = email.trim().toLowerCase();
  }

  if (password && password.trim()) {
    updateData.password = password.trim();
  }

  if (typeof isVerified === "boolean") {
    updateData.isVerified = isVerified;
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No valid fields provided for update");
  }

  if (updateData.email) {
    const existingUser = await User.findOne({
      email: updateData.email,
      _id: { $ne: id },
    });

    if (existingUser) {
      throw new ApiError(409, "Email is already in use");
    }
  }

  const user = await User.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User updated successfully"));
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user id");
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User deleted successfully"));
});

export {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser
};
