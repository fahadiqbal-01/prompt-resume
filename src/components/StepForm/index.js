"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepPersonal from "./StepPersonal";
import StepExperience from "./StepExperience";
import StepSkills from "./StepSkills";
import StepEducation from "./StepEducation";
import StepCertifications from "./StepCertifications";
import StepLanguages from "./StepLanguages";

const STEPS = [
  "Personal",
  "Experience",
  "Skills",
  "Languages",
  "Education",
  "Awards",
];

export default function StepForm({ data, onChange, onGenerate, loading }) {
  const [step, setStep] = useState(0);

  const isStepValid = () => {
    switch (step) {
      case 0:
        return !!(
          data.name?.trim() &&
          data.email?.trim() &&
          data.phone?.trim() &&
          data.targetRole?.trim() &&
          data.summary?.trim()
        );
      case 1:
        return (
          data.experience.length > 0 &&
          data.experience.every(
            (exp) =>
              exp.company?.trim() &&
              exp.role?.trim() &&
              exp.duration?.trim() &&
              exp.description?.trim(),
          )
        );
      case 2:
        return data.skills.length > 0;
      case 3:
        return (data.languages || []).length > 0;
      case 4:
        return (
          data.education.length > 0 &&
          data.education.every(
            (ed) => ed.school?.trim() && ed.degree?.trim() && ed.year?.trim(),
          )
        );
      case 5:
        return (data.certifications || []).length > 0;
      default:
        return true;
    }
  };

  const isValid = isStepValid();

  const stepComponents = [
    <StepPersonal key="p" data={data} onChange={onChange} />,
    <StepExperience key="e" data={data} onChange={onChange} />,
    <StepSkills key="s" data={data} onChange={onChange} />,
    <StepLanguages key="l" data={data} onChange={onChange} />,
    <StepEducation key="ed" data={data} onChange={onChange} />,
    <StepCertifications key="c" data={data} onChange={onChange} />,
  ];

  return (
    <div className="space-y-6 w-full  ">
      <h1 className="text-2xl font-bold">
        AI Resume Builder
        <p className=" font-light text-sm text-white/70 mt-1 ">
          Developed & Designed byㅤ
          <a
            href="mailto:your@email.com"
            className=" underline text-emerald-500 "
          >
            Fahad Iqbal
          </a>
        </p>
      </h1>

      <div className="flex gap-1 bg-neutral-900 p-1 rounded-xl">
        {STEPS.map((s, i) => (
          <button
            key={s}
            onClick={() => (i <= step || isValid ? setStep(i) : null)}
            className={`flex-1 py-2 text-sm rounded-lg transition ${i > step && !isValid ? "cursor-not-allowed opacity-50" : ""} ${
              step === i
                ? "bg-emerald-500 text-white md:text-[14px] text-[10px] font-semibold"
                : "text-neutral-400 md:text-[14px] text-[10px] hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.2 }}
        >
          {stepComponents[step]}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between pt-2">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`px-5 py-2 rounded-xl border border-neutral-700 text-sm
          hover:border-neutral-400 transition ${step === 0 ? "invisible" : ""}`}
        >
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!isValid}
            className="px-5 py-2 rounded-xl bg-neutral-800 text-sm
            hover:bg-neutral-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onGenerate}
            disabled={loading || !isValid}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400
            text-black font-semibold text-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        )}
      </div>
    </div>
  );
}
