"use client";
import { useState } from "react";

const LEVELS = ["Native", "Fluent", "Conversational"];

export default function StepLanguages({ data, onChange }) {
  const [lang, setLang] = useState("");
  const [level, setLevel] = useState("Fluent");

  const addLanguage = () => {
    if (!lang.trim()) return;
    onChange({
      ...data,
      languages: [...(data.languages || []), { language: lang.trim(), level }],
    });
    setLang("");
  };

  const removeLanguage = (i) => {
    const updated = data.languages.filter((_, idx) => idx !== i);
    onChange({ ...data, languages: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="flex-[2] bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-emerald-500 transition"
          placeholder="Language (e.g. French)"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addLanguage()}
        />
        <select
          className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-2 py-2.5 text-white text-sm outline-none focus:border-emerald-500 transition cursor-pointer"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <button
          onClick={addLanguage}
          className="px-4 py-2 bg-emerald-500 rounded-xl text-black text-sm font-semibold transition"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {data.languages?.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-neutral-800 p-3 rounded-xl border border-neutral-700"
          >
            <div className="text-sm">
              <span className="text-white font-medium">{item.language}</span>
              <span className="text-neutral-500 ml-2 text-xs">
                ({item.level})
              </span>
            </div>
            <button
              onClick={() => removeLanguage(i)}
              className="text-neutral-500 hover:text-red-400 text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
