import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post("/login", loginUser);

/**
 * @route POST /api/auth/logout
 * @desc Logout user by clearing the token from cookie and adding it to blacklist
 * @access Public
 */
router.get("/logout", logoutUser);

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user details
 * @access Private
 */
router.get("/get-me", authUser, getCurrentUser);

export default router;
