import { useSelector } from "react-redux";

export default function CVPreview() {
  const { personal, education, experience, skills } = useSelector(
    (state) => state.cv,
  );

  const SectionHeader = ({ title }) => (
    <div style={{ marginTop: "32px", marginBottom: "12px" }}>
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 600,
          margin: 0,
        }}
      >
        {title}
      </h2>
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
        width: "794px", // exact A4 width at 96dpi
        minHeight: "1123px", // exact A4 height at 96dpi
        padding: "60px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, margin: 0 }}>
          {personal.fullName || "Your Name"}
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

      {/* PROFESSIONAL SUMMARY */}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontWeight: 500, margin: 0 }}>{edu.degree}</p>
                <p style={{ fontStyle: "italic", margin: 0 }}>
                  [{edu.startDate} – {edu.endDate}]
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontStyle: "italic",
                  marginTop: "2px",
                }}
              >
                <p style={{ margin: 0 }}>{edu.school}</p>
                <p style={{ margin: 0 }}>{edu.location}</p>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontWeight: 500, margin: 0 }}>{exp.role}</p>
                  <p style={{ fontStyle: "italic", margin: 0 }}>
                    {exp.company}
                  </p>
                </div>

                <p style={{ fontStyle: "italic", margin: 0 }}>
                  [{exp.startDate} – {exp.endDate}]
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
      {skills.length > 0 && (
        <>
          <SectionHeader title="Skills" />
          <p style={{ fontSize: "14px" }}>{skills.join(", ")}</p>
        </>
      )}
    </div>
  );
}
