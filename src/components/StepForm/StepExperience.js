export default function StepExperience({ data, onChange }) {
  const updateExp = (i, key, val) => {
    const updated = data.experience.map((e, idx) =>
      idx === i ? { ...e, [key]: val } : e,
    );
    onChange({ ...data, experience: updated });
  };

  const addExp = () =>
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { company: "", role: "", duration: "", description: "" },
      ],
    });

  const removeExp = (i) =>
    onChange({
      ...data,
      experience: data.experience.filter((_, idx) => idx !== i),
    });

  return (
    <div className="space-y-6">
      {data.experience.map((exp, i) => (
        <div
          key={i}
          className="space-y-3 border border-neutral-800 rounded-xl p-4 relative"
        >
          {data.experience.length > 1 && (
            <button
              onClick={() => removeExp(i)}
              className="absolute top-3 right-3 text-neutral-500 hover:text-red-400 text-xs"
            >
              Remove
            </button>
          )}
          {["company", "role", "duration"].map((key) => (
            <input
              key={key}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl
                         px-4 py-2.5 text-white text-sm outline-none
                         focus:border-emerald-500 transition"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={exp[key]}
              onChange={(e) => updateExp(i, key, e.target.value)}
            />
          ))}
          <textarea
            rows={3}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl
                       px-4 py-2.5 text-white text-sm outline-none
                       focus:border-emerald-500 transition resize-none"
            placeholder="Describe your role... (AI will polish this)"
            value={exp.description}
            onChange={(e) => updateExp(i, "description", e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={addExp}
        className="w-full py-2 border border-dashed border-neutral-700
        rounded-xl text-sm text-neutral-400 hover:border-emerald-500 transition"
      >
        + Add Experience
      </button>
    </div>
  );
}
