import Navbar from "../components/Navbar";
import SectionsSidebar from "../components/SectionsSidebar";
import PersonalForm from "../components/forms/PersonalForm";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import CVPreview from "../components/preview/CVPreview";
import { useState } from "react";

export default function BuilderLayout() {
  const [activeSection, setActiveSection] = useState("personal");

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
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/5 border-r p-4">
          <SectionsSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Form */}
        <div className="w-2/5 p-6 overflow-y-auto">{renderForm()}</div>

        {/* Preview */}
        <div className="w-2/5 bg-gray-50 p-6 overflow-y-auto">
          <CVPreview />
        </div>
      </div>
    </div>
  );
}
