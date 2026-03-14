import React, { useEffect, useState } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { Link, useParams } from "react-router";

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
];

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-lg">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-start gap-3 p-4 cursor-pointer"
      >
        <span className="text-xs px-2 py-1 rounded bg-[#d20d3b1a] text-[#d20d3b]">
          Q{index + 1}
        </span>

        <p className="text-sm flex-1">{item.question}</p>

        <span className={`transition ${open ? "rotate-180" : ""}`}>⌄</span>
      </div>

      {open && (
        <div className="px-4 pb-4 space-y-4 text-sm text-gray-400">
          <div>
            <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
              Intention
            </span>
            <p className="mt-1">{item.intention}</p>
          </div>

          <div>
            <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">
              Model Answer
            </span>
            <p className="mt-1">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMap = ({ plan }) => {
  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-4 mb-6">
        <h2 className="text-lg font-semibold">Preparation Road Map</h2>

        <span className="text-xs bg-[#1f2937] px-3 py-1 rounded-full text-gray-300">
          {plan.length}-day plan
        </span>
      </div>

      <div className="relative flex flex-col gap-10 pl-8 flex-1">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[#d20d3b]" />

        {plan.map((day) => (
          <div key={day.day} className="relative">
            <div className="absolute -left-6.5 top-1 w-4 h-4 rounded-full border-2 border-[#d20d3b] bg-[#0b0f17]" />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded bg-[#d20d3b1a] text-[#d20d3b]">
                  Day {day.day}
                </span>

                <h3 className="font-medium">{day.focus}</h3>
              </div>

              <ul className="text-sm text-gray-400 space-y-1">
                {day.tasks.map((task, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#d20d3b]">•</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");

  const { report, loading, getReportById, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white">
        Loading interview plan...
      </div>
    );
  }

  const scoreColor =
    report.matchScore >= 80
      ? "border-green-500"
      : report.matchScore >= 60
        ? "border-yellow-500"
        : "border-red-500";

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white p-6">
      <div className="max-w-7xl mx-auto lg:h-[90vh] grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-6 bg-[#0f172a] border border-gray-800 rounded-xl p-6">
        {/* LEFT NAV */}

        <aside className="flex flex-col justify-between border-r border-gray-800 pr-4">
          <div className="flex flex-col gap2">
            <div>
              <Link
                to={"/"}
                className="bg-[#d20d3b] hover:bg-[#b90b34] transition text-white text-sm font-medium px-2 py-2 rounded-lg cursor-pointer"
              >
                Back
              </Link>
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mt-4 mb-2">
              Sections
            </p>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`text-left px-3 py-2 mb-1.5 rounded-lg text-sm cursor-pointer transition
                ${
                  activeNav === item.id
                    ? "bg-[#d20d3b1a] text-[#d20d3b]"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div>
            <button
              onClick={() => getResumePdf(interviewId)}
              className="mt-3 w-full bg-[#d20d3b] hover:bg-[#b90b34] transition text-white text-sm font-medium py-2 rounded-lg cursor-pointer"
            >
              Download Resume
            </button>
          </div>
        </aside>

        {/* CENTER CONTENT */}

        <main className="flex flex-col h-full overflow-y-auto pr-2">
          {activeNav === "technical" && (
            <section className="flex flex-col h-full">
              <div className="flex items-center gap-3 border-b border-gray-800 pb-4 mb-6">
                <h2 className="text-lg font-semibold">Technical Questions</h2>

                <span className="text-xs bg-[#1f2937] px-3 py-1 rounded-full text-gray-300">
                  {report.technicalQuestions.length} questions
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section className="flex flex-col h-full">
              <div className="flex items-center gap-3 border-b border-gray-800 pb-4 mb-6">
                <h2 className="text-lg font-semibold">Behavioral Questions</h2>

                <span className="text-xs bg-[#1f2937] px-3 py-1 rounded-full text-gray-300">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && <RoadMap plan={report.preparationPlan} />}
        </main>

        {/* RIGHT SIDEBAR */}

        <aside className="flex flex-col gap-6 border-l border-gray-800 pl-6">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Match Score
            </p>

            <div
              className={`flex items-center justify-center w-24 h-24 rounded-full border-4 ${scoreColor}`}
            >
              <span className="text-2xl font-bold">{report.matchScore}%</span>
            </div>

            <p className="text-sm text-green-400">Strong match for this role</p>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Skill Gaps
            </p>

            <div className="flex flex-col gap-2">
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className={`text-xs px-3 py-2 rounded-md
                    ${
                      gap.severity === "high"
                        ? "bg-red-600/20 text-red-400"
                        : gap.severity === "medium"
                          ? "bg-yellow-600/20 text-yellow-400"
                          : "bg-green-600/20 text-green-400"
                    }`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
