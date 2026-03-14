import { PDFParse } from "pdf-parse";

import interviewReportModel from "../models/interviewReport.model.js";
import {
  generateInterviewReport,
  generateResumePdf,
} from "../services/ai.service.js";

/**
 * @name getInterviewReport
 * @desc Generates interview report, expects resume pdf, user self declaration and job description
 * @route POST /api/interview/
 * @access Private
 */
export const getInterviewReport = async (req, res) => {
  const resumeContent =
    req.file && req.file.buffer
      ? await new PDFParse(Uint8Array.from(req.file.buffer)).getText()
      : "No resume";

  const { selfDescription, jobDescription } = req.body;

  if (!jobDescription)
    return res.status(400).json({ message: "Job Description is necessary" });

  const aiInterviewReport = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...aiInterviewReport,
  });

  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
};

/**
 * @name getInterviewReportById
 * @desc get interview report by interviewId
 * @route GET /api/interview/report/:interviewId
 * @access Private
 */
export const getInterviewReportById = async (req, res) => {
  const interviewId = req.params.interviewId;

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found",
    });
  }

  res.status(200).json({
    message: "Interview report fetched successfully",
    interviewReport,
  });
};

/**
 * @name getAllInterviewReports
 * @desc get all interview reports of user
 * @route GET /api/interview/
 * @access Private
 */
export const getAllInterviewReports = async (req, res) => {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully",
    interviewReports,
  });
};

/**
 * @name getResumePdf
 * @desc generate resume PDF based on user self description, resume and job description.
 * @route POST /api/interview/resume/pdf/:interviewId
 * @access Private
 */
export const getResumePdf = async (req, res) => {
  const interviewId = req.params.interviewId;

  const interviewReport = await interviewReportModel.findById(interviewId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found.",
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    jobDescription,
    selfDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`,
  });

  res.send(pdfBuffer);
};
