import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import interviewRoutes from "./routes/interview.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://project-resume-analyzer.vercel.app",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

export default app;
