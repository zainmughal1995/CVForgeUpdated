import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  updateEducation,
  removeEducation,
} from "../../store/cvSlice";

export default function EducationForm() {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.cv.education);

  const handleAdd = () => {
    dispatch(
      addEducation({
        id: crypto.randomUUID(),
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
      }),
    );
  };

  const handleChange = (id, field, value) => {
    dispatch(
      updateEducation({
        id,
        data: { [field]: value },
      }),
    );
  };

  const handleRemove = (id) => {
    dispatch(removeEducation(id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Education</h2>

      {education.map((edu) => (
        <div key={edu.id} className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder="School"
            className="w-full border p-2 rounded"
            value={edu.school}
            onChange={(e) => handleChange(edu.id, "school", e.target.value)}
          />

          <input
            type="text"
            placeholder="Degree"
            className="w-full border p-2 rounded"
            value={edu.degree}
            onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Start Date"
              className="w-1/2 border p-2 rounded"
              value={edu.startDate}
              onChange={(e) =>
                handleChange(edu.id, "startDate", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="End Date"
              className="w-1/2 border p-2 rounded"
              value={edu.endDate}
              onChange={(e) => handleChange(edu.id, "endDate", e.target.value)}
            />
          </div>

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
