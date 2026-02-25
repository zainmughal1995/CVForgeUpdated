import { useSelector } from "react-redux";

export default function CVPreview() {
  const { personal, education, experience, skills } = useSelector(
    (state) => state.cv,
  );

  const SectionHeader = ({ title }) => (
    <div style={{ marginTop: "32px", marginBottom: "12px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>{title}</h2>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid black",
          marginTop: "4px",
        }}
      />
    </div>
  );

  return (
    <div
      id="cv-preview"
      style={{
        background: "#ffffff",
        color: "#000000",
        fontFamily: "Times New Roman, serif",
        width: "700px",
        // minHeight: "1123px",
        padding: "60px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, margin: 0 }}>
          {personal.full_name || "Your Name"}
        </h1>

        <p style={{ marginTop: "8px", fontSize: "14px" }}>
          {personal.location}
        </p>

        <p style={{ marginTop: "4px", fontSize: "14px" }}>
          {personal.phone}
          {personal.phone && personal.email && " | "}
          {personal.email}
        </p>
      </div>

      {/* SUMMARY */}
      {personal.summary && (
        <>
          <SectionHeader title="Professional Summary" />
          <p style={{ fontSize: "14px", textAlign: "justify" }}>
            {personal.summary}
          </p>
        </>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <>
          <SectionHeader title="Education" />

          {education.map((edu) => (
            <div key={edu.id} style={{ marginTop: "12px", fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: 500, margin: 0 }}>{edu.degree}</p>

                <p style={{ fontStyle: "italic", margin: 0 }}>
                  {edu.start_year || ""} {edu.start_year && edu.end_year && "–"}{" "}
                  {edu.end_year || ""}
                </p>
              </div>

              <p style={{ fontStyle: "italic", marginTop: "2px" }}>
                {edu.institution}
              </p>
            </div>
          ))}
        </>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <>
          <SectionHeader title="Experience" />

          {experience.map((exp) => (
            <div key={exp.id} style={{ marginTop: "16px", fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontWeight: 500, margin: 0 }}>{exp.title}</p>
                  <p style={{ fontStyle: "italic", margin: 0 }}>
                    {exp.company}
                  </p>
                </div>

                <p style={{ fontStyle: "italic", margin: 0 }}>
                  {exp.start_year || ""}
                  {exp.start_year && exp.end_year && " – "}
                  {exp.end_year || ""}
                </p>
              </div>

              {exp.description && (
                <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                  {exp.description.split("\n").map((line, index) => (
                    <li key={index} style={{ marginBottom: "4px" }}>
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}

      {/* SKILLS */}
      {skills && skills.length > 0 && (
        <>
          <SectionHeader title="Skills" />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            {skills
              .filter((s) => s && s.name)
              .map((s) => (
                <span
                  key={s.id}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#e5e5e5",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                >
                  {s.name}
                </span>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
