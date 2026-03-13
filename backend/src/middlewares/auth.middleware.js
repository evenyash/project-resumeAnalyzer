import jwt from "jsonwebtoken";

import blacklistTokenModel from "../models/blacklist.model.js";

/**
 * @name authUser
 * @desc Middleware to protect routes, checks for valid JWT token in cookies and ensures it's not blacklisted
 * @access Private
 */
export const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, token not found",
    });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({
      message: "Unauthorized, invalid token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, invalid token",
    });
  }
};
