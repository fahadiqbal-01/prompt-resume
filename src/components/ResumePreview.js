"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function ResumePreview({ data, isAI }) {
  const ref = useRef(null);

  const handleExport = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(ref.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      unit: "px",
      format: [canvas.width / 2, canvas.height / 2],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`${data.name || "resume"}.pdf`);
  };

  // Define helpers to prevent "undefined" map errors
  const displaySummary = isAI ? data.aiSummary : data.summary;
  const displayExperience = Array.isArray(
    isAI ? data.aiExperience : data.experience,
  )
    ? isAI
      ? data.aiExperience
      : data.experience
    : [];
  const displaySkills = data.skills || [];
  const displayEducation = data.education || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-xs text-neutral-500 uppercase tracking-widest">
          {isAI ? "AI-Enhanced Preview" : "Live Preview"}
        </p>
        <button
          onClick={handleExport}
          className="px-4 py-1.5 rounded-lg border border-neutral-700 text-xs
          hover:border-emerald-500 hover:text-emerald-400 transition"
        >
          Export PDF
        </button>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white text-neutral-900 rounded-xl p-8 space-y-5 text-sm shadow-2xl"
      >
        {/* Header */}
        <div className="border-b border-neutral-200 pb-4">
          <h1 className="text-2xl font-bold text-neutral-900">
            {data.name || "Your Name"}
          </h1>
          <p className="text-emerald-600 font-medium">
            {data.targetRole || "Target Role"}
          </p>
          <p className="text-neutral-500 text-xs mt-1">
            {data.email} {data.phone && ` · ${data.phone}`}
          </p>
        </div>

        {/* Summary */}
        {displaySummary && (
          <div>
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-1 font-bold">
              Summary
            </h2>
            <p className="text-neutral-700 leading-relaxed">{displaySummary}</p>
          </div>
        )}

        {/* Experience - Fixed with optional chaining and fallback */}
        {displayExperience.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-bold">
              Experience
            </h2>
            <div className="space-y-3">
              {displayExperience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <p className="font-semibold">{exp?.role}</p>
                    <p className="text-neutral-400 text-xs">{exp?.duration}</p>
                  </div>
                  <p className="text-emerald-600 text-xs mb-1">
                    {exp?.company}
                  </p>
                  <p className="text-neutral-600 whitespace-pre-line">
                    {exp?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills - Fixed */}
        {displaySkills.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-bold">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {displaySkills.map((s, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-neutral-100 rounded text-xs border border-neutral-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education - Fixed */}
        {displayEducation.length > 0 && (
          <div>
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-bold">
              Education
            </h2>
            {displayEducation.map((ed, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <p className="font-semibold">{ed?.school}</p>
                  <p className="text-neutral-500 text-xs">{ed?.degree}</p>
                </div>
                <p className="text-neutral-400 text-xs">{ed?.year}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
