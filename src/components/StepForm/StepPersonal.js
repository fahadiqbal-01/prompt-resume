export default function StepPersonal({ data, onChange }) {
  const update = (key, val) => onChange({ ...data, [key]: val });

  return (
    <div className="space-y-4">
      {[
        { label: "Full Name", key: "name", placeholder: "Your Name" },
        { label: "Email", key: "email", placeholder: "email@example.com" },
        { label: "Phone", key: "phone", placeholder: "+123456789" },
        {
          label: "Target Role",
          key: "targetRole",
          placeholder: "Frontend Developer",
        },
      ].map(({ label, key, placeholder }) => (
        <div key={key}>
          <label className="block text-xs text-neutral-400 mb-1">{label}</label>
          <input
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl
                       px-4 py-2.5 text-white text-sm outline-none
                       focus:border-emerald-500 transition"
            placeholder={placeholder}
            value={data[key]}
            onChange={(e) => update(key, e.target.value)}
          />
        </div>
      ))}
      <div>
        <label className="block text-xs text-neutral-400 mb-1">
          Summary (raw — AI will rewrite this)
        </label>
        <textarea
          rows={4}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-xl
                     px-4 py-2.5 text-white text-sm outline-none
                     focus:border-emerald-500 transition resize-none"
          placeholder="Brief overview of your experience..."
          value={data.summary}
          onChange={(e) => update("summary", e.target.value)}
        />
      </div>
    </div>
  );
}
