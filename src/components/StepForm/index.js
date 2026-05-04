"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepPersonal from "./StepPersonal";
import StepExperience from "./StepExperience";
import StepSkills from "./StepSkills";
import StepEducation from "./StepEducation";

const STEPS = ["Personal", "Experience", "Skills", "Education"];

export default function StepForm({ data, onChange, onGenerate, loading }) {
  const [step, setStep] = useState(0);

  const stepComponents = [
    <StepPersonal key="p" data={data} onChange={onChange} />,
    <StepExperience key="e" data={data} onChange={onChange} />,
    <StepSkills key="s" data={data} onChange={onChange} />,
    <StepEducation key="ed" data={data} onChange={onChange} />,
  ];

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold">AI Resume Builder</h1>

      {/* Step tabs */}
      <div className="flex gap-1 bg-neutral-900 p-1 rounded-xl">
        {STEPS.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`flex-1 py-2 text-sm rounded-lg transition ${
              step === i
                ? "bg-emerald-500 text-white font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Step content */}
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

      {/* Navigation */}
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
            className="px-5 py-2 rounded-xl bg-neutral-800 text-sm
            hover:bg-neutral-700 transition"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onGenerate}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400
            text-black font-semibold text-sm transition disabled:opacity-40"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        )}
      </div>
    </div>
  );
}
