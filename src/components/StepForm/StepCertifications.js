"use client";
import { useState } from "react";

export default function StepCertifications({ data, onChange }) {
  const [input, setInput] = useState("");

  const addCert = () => {
    if (!input.trim()) return;
    onChange({
      ...data,
      certifications: [...(data.certifications || []), input.trim()],
    });
    setInput("");
  };

  const removeCert = (i) => {
    const updated = data.certifications.filter((_, idx) => idx !== i);
    onChange({ ...data, certifications: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#0F52BA] transition"
          placeholder="e.g. AWS Certified Solutions Architect, Hackathon Winner"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCert()}
        />
        <button
          onClick={addCert}
          className="px-4 py-2 bg-[#0F52BA] rounded-xl text-white text-sm font-semibold transition"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {data.certifications?.map((cert, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-neutral-800 p-3 rounded-xl border border-neutral-700"
          >
            <span className="text-sm text-white">{cert}</span>
            <button
              onClick={() => removeCert(i)}
              className="text-neutral-500 hover:text-red-400 text-xs"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
