// BuilderLayout.jsx
// Final correct version with proportional preview scaling.

import Navbar from "../components/Navbar";
import SectionsSidebar from "../components/SectionsSidebar";
import PersonalForm from "../components/forms/PersonalForm";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import CVPreview from "../components/preview/CVPreview";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCV } from "../store/cvSlice";

export default function BuilderLayout() {
  const [activeSection, setActiveSection] = useState("personal");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCV());
  }, [dispatch]);

  const renderForm = () => {
    switch (activeSection) {
      case "education":
        return <EducationForm />;
      case "experience":
        return <ExperienceForm />;
      case "skills":
        return <SkillsForm />;
      default:
        return <PersonalForm />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] overflow-hidden">
      {/* Navbar */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200">
        <Navbar />
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-0">
          <div className="px-6 py-6 border-b border-gray-100">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Builder
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <SectionsSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
        </aside>

        {/* Form Panel */}
        <section className="w-[380px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-0">
          <div className="px-10 py-8 border-b border-gray-100">
            <h1 className="text-2xl font-semibold">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto px-10 py-8">
            {renderForm()}
          </div>
        </section>

        {/* Preview Panel */}
        <section className="flex-1 min-h-0 bg-[#eef2f7] overflow-hidden flex justify-center items-start">
          <div className="h-full w-full overflow-auto flex justify-center py-10">
            {/* SCALE CONTAINER */}
            <div
              className="origin-top"
              style={{
                // width: "1000px", // Logical page width
                transform: "scale(clamp(0.6, 100vw / 1700, 1))",
              }}
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md py-12">
                <CVPreview />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
