"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function ResumePreview({ data, isAI, onAddSkill }) {
  const ref = useRef(null);

  const handleExport = async () => {
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(ref.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        const el = clonedDoc.getElementById("resume-preview-root");
        if (el) el.style.color = "#171717";
      },
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      unit: "px",
      format: [canvas.width / 2, canvas.height / 2],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`${data.name || "resume"}.pdf`);
  };

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

  const analysis = data.analysis || null;

  const SectionHeader = ({ title }) => (
    <div className="flex items-center gap-4 mb-4 mt-8">
      <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#171717] whitespace-nowrap">
        {title}
      </h2>
      <div className="flex-grow h-[1.5px] bg-[#0F52BA]"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-xs text-neutral-500 uppercase tracking-widest">
          {isAI ? "AI-Enhanced Preview" : "Live Preview"}
        </p>
        <button
          onClick={handleExport}
          className="px-4 py-1.5 rounded-lg border border-neutral-700 text-xs hover:border-[#0F52BA] hover:text-[#0F52BA] transition"
        >
          Export PDF
        </button>
      </div>


      {isAI && analysis && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#0F52BA] flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {analysis.score}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Resume Strength
                </h3>
                <p className="text-[10px] text-neutral-500 uppercase">
                  AI Assessment
                </p>
              </div>
            </div>
            {data.layoutSuggestion && (
              <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 rounded border border-neutral-700">
                Design: {data.layoutSuggestion}
              </span>
            )}
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed italic">
            "{analysis.feedback}"
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-[10px] font-bold text-neutral-500 uppercase mb-2">
                Missing Skills
              </p>
              <div className="flex flex-wrap gap-1">
                {analysis.suggestedSkills?.map((skill, i) => (
                  <button
                    key={i}
                    onClick={() => onAddSkill && onAddSkill(skill)}
                    className="text-[9px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded 
                               hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer border border-emerald-500/20"
                    title="Click to add to resume"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-neutral-500 uppercase mb-2">
                ATS Keywords
              </p>
              <div className="flex flex-wrap gap-1">
                {analysis.atsKeywords?.map((kw, i) => (
                  <span
                    key={i}
                    className="text-[9px] bg-[#0F52BA]/10 text-[#0F52BA] px-1.5 py-0.5 rounded"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        ref={ref}
        id="resume-preview-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white text-[#171717] shadow-2xl pb-12 overflow-hidden"
      >
        <div className="bg-[#0F52BA] py-8 px-10 text-center text-white">
          <h1 className="text-3xl font-extrabold uppercase tracking-widest mb-1.5">
            {data.name || "Your Name"}
          </h1>
          <p className="text-sm font-semibold tracking-wide">
            {data.targetRole || "Target Role"}
          </p>
        </div>

        <div className="text-center text-[#525252] py-4 text-xs font-medium">
          <p>
            {data.email || "hello@example.com"}
            {data.phone && <span className="mx-2">|</span>}
            {data.phone}
          </p>
        </div>

        <div className="px-10 text-[13px]">
          {displaySummary && (
            <div>
              <SectionHeader title="Summary" />
              <p className="text-[#404040] leading-relaxed text-justify">
                {displaySummary}
              </p>
            </div>
          )}

          {displayExperience.length > 0 && (
            <div>
              <SectionHeader title="Work Experience" />
              <div className="space-y-5">
                {displayExperience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="font-bold text-neutral-900 text-[14px]">
                        {exp?.role}
                        {exp?.company && (
                          <span className="font-normal text-neutral-800">
                            , {exp.company}
                          </span>
                        )}
                      </p>
                      <p className="text-neutral-800 font-medium text-xs whitespace-nowrap">
                        {exp?.duration}
                      </p>
                    </div>
                    <ul className="text-neutral-700 list-disc pl-5 mt-2 space-y-1">
                      {exp?.description
                        ?.split("\n")
                        .filter((line) => line.trim() !== "")
                        .map((line, idx) => (
                          <li key={idx}>{line.replace(/^[-•]\s*/, "")}</li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {displayEducation.length > 0 && (
            <div>
              <SectionHeader title="Education" />
              <div className="space-y-4">
                {displayEducation.map((ed, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-[#171717] text-[14px]">
                        {ed?.degree}
                      </p>
                      <p className="text-[#262626] font-medium text-xs whitespace-nowrap">
                        {ed?.year}
                      </p>
                    </div>
                    <p className="text-[#404040] mt-0.5">{ed?.school}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {displaySkills.length > 0 && (
            <div>
              <SectionHeader title="Key Skills" />
              <ul className="list-disc pl-5 text-[#404040] space-y-1.5 grid grid-cols-2 grid-rows-4 ">
                {displaySkills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
