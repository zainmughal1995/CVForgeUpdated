import { useDispatch, useSelector } from "react-redux";
import {
  createExperience,
  updateExperienceAsync,
  deleteExperienceAsync,
} from "../../store/cvSlice";

export default function ExperienceForm() {
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.cv.experience);

  const handleAdd = () => {
    dispatch(
      createExperience({
        title: "",
        company: "",
        start_year: "",
        end_year: "",
        description: "",
      }),
    );
  };

  const handleChange = (id, field, value) => {
    const current = experience.find((e) => e.id === id);

    const updated = {
      ...current,
      [field]: value,
    };

    dispatch(
      updateExperienceAsync({
        id,
        data: updated,
      }),
    );
  };

  const handleRemove = (id) => {
    dispatch(deleteExperienceAsync(id));
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
            value={exp.company || ""}
            onChange={(e) => handleChange(exp.id, "company", e.target.value)}
          />

          <input
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={exp.title || ""}
            onChange={(e) => handleChange(exp.id, "title", e.target.value)}
          />

          <input
            type="text"
            placeholder="Start Year"
            className="w-full border p-2 rounded"
            value={exp.start_year || ""}
            onChange={(e) => handleChange(exp.id, "start_year", e.target.value)}
          />

          <input
            type="text"
            placeholder="End Year"
            className="w-full border p-2 rounded"
            value={exp.end_year || ""}
            onChange={(e) => handleChange(exp.id, "end_year", e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded h-24"
            value={exp.description || ""}
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
