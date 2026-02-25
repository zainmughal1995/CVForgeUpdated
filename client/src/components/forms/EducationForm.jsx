import { useDispatch, useSelector } from "react-redux";
import {
  createEducation,
  updateEducationAsync,
  deleteEducationAsync,
} from "../../store/cvSlice";

export default function EducationForm() {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.cv.education);

  const handleAdd = () => {
    dispatch(
      createEducation({
        institution: "",
        degree: "",
        start_year: "",
        end_year: "",
      }),
    );
  };

  const handleChange = (id, field, value) => {
    const current = education.find((e) => e.id === id);

    const updated = {
      ...current,
      [field]: value,
    };

    dispatch(
      updateEducationAsync({
        id,
        data: updated,
      }),
    );
  };

  const handleRemove = (id) => {
    dispatch(deleteEducationAsync(id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Education</h2>

      {education.map((edu) => (
        <div key={edu.id} className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder="Institution"
            className="w-full border p-2 rounded"
            value={edu.institution || ""}
            onChange={(e) =>
              handleChange(edu.id, "institution", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Degree"
            className="w-full border p-2 rounded"
            value={edu.degree || ""}
            onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
          />

          <input
            type="text"
            placeholder="Start Year"
            className="w-full border p-2 rounded"
            value={edu.start_year || ""}
            onChange={(e) => handleChange(edu.id, "start_year", e.target.value)}
          />

          <input
            type="text"
            placeholder="End Year"
            className="w-full border p-2 rounded"
            value={edu.end_year || ""}
            onChange={(e) => handleChange(edu.id, "end_year", e.target.value)}
          />

          <button
            onClick={() => handleRemove(edu.id)}
            className="text-sm text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Add Education
      </button>
    </div>
  );
}
