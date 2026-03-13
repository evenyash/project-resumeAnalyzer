import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklist.model.js";

/**
 * @name registerUser
 * @desc Register a new user, expects username, email address and password in the request body
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username, email address and password" });
  }

  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists with this username or email address",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

/**
 * @name loginUser
 * @desc Login user, expects email address and password in the request body
 * @route POST /api/auth/login
 * @access Public
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email address and password" });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid email address or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Invalid email address or password" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

/**
 * @name logoutUser
 * @desc Logout user by clearing the token from cookie and adding it to blacklist
 * @route GET /api/auth/logout
 * @access Public
 */
export const logoutUser = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    await blacklistTokenModel.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({ message: "User logged out successfully" });
};

/**
 * @name getCurrentUser
 * @desc Get the currently logged in user based on the token in the cookie
 * @route GET /api/auth/get-me
 * @access Private
 */
export const getCurrentUser = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
