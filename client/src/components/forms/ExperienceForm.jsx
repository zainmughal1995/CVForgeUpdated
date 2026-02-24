import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  updateExperience,
  removeExperience,
} from "../../store/cvSlice";

export default function ExperienceForm() {
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.cv.experience);

  const handleAdd = () => {
    dispatch(
      addExperience({
        id: crypto.randomUUID(),
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      }),
    );
  };

  const handleChange = (id, field, value) => {
    dispatch(
      updateExperience({
        id,
        data: { [field]: value },
      }),
    );
  };

  const handleRemove = (id) => {
    dispatch(removeExperience(id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Experience</h2>

      {experience.map((exp) => (
        <div key={exp.id} className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder="Company"
            className="w-full border p-2 rounded"
            value={exp.company}
            onChange={(e) => handleChange(exp.id, "company", e.target.value)}
          />

          <input
            type="text"
            placeholder="Role"
            className="w-full border p-2 rounded"
            value={exp.role}
            onChange={(e) => handleChange(exp.id, "role", e.target.value)}
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Start Date"
              className="w-1/2 border p-2 rounded"
              value={exp.startDate}
              onChange={(e) =>
                handleChange(exp.id, "startDate", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="End Date"
              className="w-1/2 border p-2 rounded"
              value={exp.endDate}
              onChange={(e) => handleChange(exp.id, "endDate", e.target.value)}
            />
          </div>

          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded h-24"
            value={exp.description}
            onChange={(e) =>
              handleChange(exp.id, "description", e.target.value)
            }
          />

          <button
            onClick={() => handleRemove(exp.id)}
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
        Add Experience
      </button>
    </div>
  );
}
