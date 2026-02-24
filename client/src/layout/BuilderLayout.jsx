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
        <div className="w-1/6 border-r p-4">
          <SectionsSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Form */}
        <div className="w-1/3 p-6 overflow-y-auto">{renderForm()}</div>

        {/* Preview */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto flex justify-center">
          <CVPreview />
        </div>
      </div>
    </div>
  );
}
