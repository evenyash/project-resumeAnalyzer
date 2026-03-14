import React, { useState, useRef } from "react";

import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth.js";
import toast from "react-hot-toast";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const { handleLogout } = useAuth();

  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    if (!jobDescription) return toast.error("Job description is requried!");

    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  const handleUserLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl md:mb-10 mb-2">
        <h1 className="text-3xl md:text-4xl font-bold">
          Create Your Custom{" "}
          <span className="bg-linear-to-r from-[#d20d3b] to-blue-500 bg-clip-text text-transparent">
            Interview Plan
          </span>
        </h1>
        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleUserLogout}
            className="md:hidden block px-3 py-1.5 text-sm rounded-lg bg-[#d20d3b] hover:bg-[#b50b32] transition mt-4 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-6xl bg-[#121826] border border-gray-800 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Panel */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#d20d3b]"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>

              <label htmlFor="jobDescription" className="font-semibold">
                Target Job Description
              </label>

              <span className="ml-auto text-xs bg-pink-600/20 text-[#d20d3b] px-2 py-1 rounded">
                Required
              </span>
            </div>

            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              id="jobDescription"
              name="jobDescription"
              maxLength={5000}
              placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript...'`}
              className="w-full h-72 bg-[#0f1420] border border-gray-700 rounded-lg p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#d20d3b]"
            />
          </div>

          {/* Right Panel */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>

                <h2 className="font-semibold">Your Profile</h2>
              </div>

              <button
                onClick={handleLogout}
                className="hidden md:block px-3 py-1.5 text-sm rounded-lg bg-[#d20d3b] hover:bg-[#b50b32] transition cursor-pointer"
              >
                Logout
              </button>
            </div>

            {/* Upload Resume */}
            <div className="mb-6">
              <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
                Upload Resume
                <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                  Best Results
                </span>
              </label>

              <label
                htmlFor="resume"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg h-36 cursor-pointer hover:border-blue-500 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mb-2 text-blue-500"
                >
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </svg>

                <p className="text-sm">Click to upload or drag & drop</p>
                <p className="text-xs text-gray-500">PDF only(Max 5MB)</p>

                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf"
                />
              </label>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-3 text-gray-500 text-xs mb-6">
              <div className="flex-1 h-px bg-gray-700"></div>
              OR
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Self Description */}
            <div className="mb-6">
              <label
                htmlFor="selfDescription"
                className="block text-sm text-gray-300 mb-2"
              >
                Quick Self-Description
              </label>

              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                id="selfDescription"
                name="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of experience..."
                className="w-full h-28 bg-[#0f1420] border border-gray-700 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-3 bg-blue-600/10 border border-blue-500/30 text-blue-300 text-sm p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>

              <p>
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required to generate a
                personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-800 px-6 py-4">
          <span className="text-xs text-gray-400">
            AI-Powered Strategy Generation • Approx 30s
          </span>

          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 bg-linear-to-r from-[#d20d3b] to-blue-500 px-6 py-2 rounded-lg text-sm font-medium hover:scale-101 transition cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            Generate My Interview Strategy
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      {reports.length > 0 && (
        <div className="w-full max-w-6xl mt-10">
          <h2 className="text-xl font-semibold mb-4">
            My Recent Interview Plans
          </h2>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <li
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                className="cursor-pointer bg-[#121826] border border-gray-800 rounded-lg p-4 hover:border-[#d20d3b] transition"
              >
                <h3 className="font-medium mb-1">
                  {report.title || "Untitled Position"}
                </h3>

                <p className="text-xs text-gray-400 mb-2">
                  Generated on {new Date(report.createdAt).toLocaleDateString()}
                </p>

                <p
                  className={`text-sm font-medium ${
                    report.matchScore >= 80
                      ? "text-green-400"
                      : report.matchScore >= 60
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer Links */}
      <div className="flex gap-6 text-xs text-gray-500 mt-8">
        <a href="#" className="hover:text-gray-300">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-gray-300">
          Terms of Service
        </a>
        <a href="#" className="hover:text-gray-300">
          Help Center
        </a>
      </div>
    </div>
  );
};

export default Home;
