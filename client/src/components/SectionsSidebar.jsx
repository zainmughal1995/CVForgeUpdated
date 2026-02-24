export default function SectionsSidebar({ activeSection, setActiveSection }) {
  const sections = [
    { key: "personal", label: "Personal" },
    { key: "education", label: "Education" },
    { key: "experience", label: "Experience" },
    { key: "skills", label: "Skills" },
  ];

  return (
    <div className="space-y-2">
      {sections.map((section) => (
        <button
          key={section.key}
          onClick={() => setActiveSection(section.key)}
          className={`w-full text-left px-3 py-2 rounded text-sm ${
            activeSection === section.key
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
}
