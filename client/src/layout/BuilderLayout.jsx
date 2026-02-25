// BuilderLayout.jsx
// Fully responsive — functionality preserved

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200">
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-white/40 shadow-sm">
        <Navbar />
      </header>

      <div className="flex flex-1 flex-col lg:flex-row min-h-0 p-4 sm:p-6 gap-4 sm:gap-6">
        <aside className="w-full lg:w-64 flex-shrink-0 rounded-3xl bg-white/80 backdrop-blur-md border border-white/50 shadow-xl flex flex-col min-h-0">
          <div className="px-6 py-6 border-b border-slate-200/60">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
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

        <section className="w-full lg:w-[420px] flex-shrink-0 rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col min-h-0">
          <div className="px-6 sm:px-8 lg:px-10 py-6 sm:py-8 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-slate-50 rounded-t-3xl">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto px-6 sm:px-8 lg:px-10 py-6 sm:py-8 bg-white rounded-b-3xl">
            {renderForm()}
          </div>
        </section>

        <section className="flex-1 min-h-[500px] lg:min-h-0 rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-inner overflow-hidden">
          <div className="w-full h-full overflow-auto flex justify-center items-start p-4 sm:p-6 lg:p-8">
            <div className="flex justify-center w-full">
              <div
                className="origin-top"
                style={{
                  transform: "scale(clamp(0.55, calc(100vw / 1200), 1))",
                }}
              >
                <div className="shadow-2xl rounded-2xl overflow-hidden">
                  <CVPreview />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
