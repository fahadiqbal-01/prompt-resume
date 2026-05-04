export default function StepEducation({ data, onChange }) {
  const update = (i, key, val) => {
    const updated = data.education.map((e, idx) =>
      idx === i ? { ...e, [key]: val } : e,
    );
    onChange({ ...data, education: updated });
  };

  const add = () =>
    onChange({
      ...data,
      education: [...data.education, { school: "", degree: "", year: "" }],
    });

  return (
    <div className="space-y-4">
      {data.education.map((ed, i) => (
        <div
          key={i}
          className="space-y-3 border border-neutral-800 rounded-xl p-4"
        >
          {["school", "degree", "year"].map((key) => (
            <input
              key={key}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl
                         px-4 py-2.5 text-white text-sm outline-none
                         focus:border-emerald-500 transition"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={ed[key]}
              onChange={(e) => update(i, key, e.target.value)}
            />
          ))}
        </div>
      ))}
      <button
        onClick={add}
        className="w-full py-2 border border-dashed border-neutral-700
        rounded-xl text-sm text-neutral-400 hover:border-emerald-500 transition"
      >
        + Add Education
      </button>
    </div>
  );
}
