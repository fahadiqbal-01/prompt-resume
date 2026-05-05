"use client";
import { useState } from "react";
import StepForm from "@/components/StepForm";
import ResumePreview from "@/components/ResumePreview";

const defaultData = {
  name: "",
  email: "",
  phone: "",
  targetRole: "",
  summary: "",
  experience: [{ company: "", role: "", duration: "", description: "" }],
  skills: [],
  education: [{ school: "", degree: "", year: "" }],
  certifications: [],
  languages: [],
};

export default function Home() {
  const [formData, setFormData] = useState(defaultData);
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddSkillFromAI = (newSkill) => {
    setFormData((prev) => {
      // Prevent adding duplicate skills
      if (prev.skills.includes(newSkill)) return prev;
      return {
        ...prev,
        skills: [...prev.skills, newSkill],
      };
    });
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        let msg = `Server error (${res.status})`;
        try {
          const errorData = await res.json();
          msg += `: ${errorData.error}`;
        } catch {
          const errorText = await res.text();
          msg += `: ${errorText.substring(0, 50)}`;
        }
        throw new Error(msg);
      }

      const json = await res.json();
      setAiData({ ...formData, ...json });
    } catch (err) {
      console.error("Generation Error:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const hasStarted =
    !!aiData ||
    formData.name.trim() !== "" ||
    formData.email.trim() !== "" ||
    formData.phone.trim() !== "" ||
    formData.targetRole.trim() !== "" ||
    formData.summary.trim() !== "" ||
    formData.skills.length > 0 ||
    formData.experience.some(
      (exp) =>
        exp.company.trim() !== "" ||
        exp.role.trim() !== "" ||
        exp.description.trim() !== "",
    ) ||
    formData.education.some(
      (ed) => ed.school.trim() !== "" || ed.degree.trim() !== "",
    ) ||
    (formData.certifications || []).length > 0 ||
    (formData.languages || []).length > 0;

  return (
    <main
      className={`min-h-screen bg-neutral-950 text-white flex lg:flex-row flex-col transition-all duration-500 ${!hasStarted ? "items-center justify-center" : ""}`}
    >
      <div
        className={`p-6 overflow-y-auto transition-all duration-500 ${hasStarted ? "w-full lg:w-1/2 border-r border-neutral-800 flex" : "w-full max-w-xl"}`}
      >
        <StepForm
          data={formData}
          onChange={setFormData}
          onGenerate={handleGenerate}
          loading={loading}
        />
      </div>

      {hasStarted && (
        <div className="w-full lg:w-1/2 h-full min-h-[50vh] lg:h-screen p-4 lg:p-6 overflow-hidden bg-neutral-900 relative">
          <ResumePreview
            data={aiData ?? formData}
            isAI={!!aiData}
            onAddSkill={handleAddSkillFromAI}
          />
        </div>
      )}
    </main>
  );
}
