import { useState } from "react";

export default function StepSkills({ data, onChange }) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    if (!input.trim()) return;
    onChange({ ...data, skills: [...data.skills, input.trim()] });
    setInput("");
  };

  const removeSkill = (i) =>
    onChange({ ...data, skills: data.skills.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl
                     px-4 py-2.5 text-white text-sm outline-none
                     focus:border-emerald-500 transition"
          placeholder="e.g. React, Node.js"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-emerald-500 rounded-xl text-black text-sm font-semibold transition"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, i) => (
          <span
            key={i}
            className="flex items-center gap-1 px-3 py-1 bg-neutral-800 rounded-full text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(i)}
              className="text-neutral-500 hover:text-red-400 ml-1"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
