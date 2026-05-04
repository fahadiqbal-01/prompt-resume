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
};

export default function Home() {
  const [formData, setFormData] = useState(defaultData);
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);

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
      // Merge original data with AI-enhanced fields
      setAiData({ ...formData, ...json });
    } catch (err) {
      console.error("Generation Error:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex">
      {/* Left Column — Form */}
      <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r border-neutral-800">
        <StepForm
          data={formData}
          onChange={setFormData}
          onGenerate={handleGenerate}
          loading={loading}
        />
      </div>

      {/* Right Column — Preview */}
      <div className="hidden md:block w-1/2 p-6 overflow-y-auto bg-neutral-900">
        <ResumePreview data={aiData ?? formData} isAI={!!aiData} />
      </div>
    </main>
  );
}
