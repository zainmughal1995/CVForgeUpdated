import { useSelector } from "react-redux";

export default function CVPreview() {
  const { personal, education, experience, skills } = useSelector(
    (state) => state.cv,
  );

  return (
    <div className="bg-white w-full max-w-[800px] mx-auto p-8 shadow text-black">
      {/* Header */}
      <h1 className="text-2xl font-bold">{personal.fullName || "Your Name"}</h1>

      <div className="text-sm mt-1">
        <p>{personal.email}</p>
        <p>{personal.phone}</p>
        <p>{personal.location}</p>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase">
            Professional Summary
          </h2>
          <p className="text-sm mt-2">{personal.summary}</p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase">Education</h2>

          {education.map((edu) => (
            <div key={edu.id} className="mt-3 text-sm">
              <p className="font-medium">{edu.degree}</p>
              <p>{edu.school}</p>
              <p>
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase">Experience</h2>

          {experience.map((exp) => (
            <div key={exp.id} className="mt-3 text-sm">
              <p className="font-medium">
                {exp.role} {exp.company && `- ${exp.company}`}
              </p>
              <p>
                {exp.startDate} - {exp.endDate}
              </p>
              {exp.description && <p className="mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase">Skills</h2>
          <p className="text-sm mt-2">{skills.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
