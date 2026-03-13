import express from "express";

import {
  getAllInterviewReports,
  getInterviewReport,
  getInterviewReportById,
  getResumePdf,
} from "../controllers/interview.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/file.middleware.js";

const router = express.Router();

/**
 * @route POST /api/interview/
 * @desc generate interview report on the basis of resume pdf, user self description, and job description.
 * @access Private
 */
router.post("/", authUser, upload.single("resume"), getInterviewReport);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access Private
 */
router.get("/report/:interviewId", authUser, getInterviewReportById);

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access Private
 */
router.get("/", authUser, getAllInterviewReports);

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description get resume pdf based on interview report
 * @access Private
 */
router.post("/resume/pdf/:interviewId", authUser, getResumePdf);

export default router;
