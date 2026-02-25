import { useDispatch, useSelector } from "react-redux";
import {
  createExperience,
  updateExperienceAsync,
  updateExperienceLocal,
  deleteExperienceAsync,
} from "../../store/cvSlice";

export default function ExperienceForm() {
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.cv.experience);

  const handleAdd = async () => {
    try {
      await dispatch(
        createExperience({
          title: "",
          company: "",
          start_year: "",
          end_year: "",
          description: "",
        }),
      ).unwrap();
    } catch (err) {
      console.log("CREATE EXPERIENCE ERROR:", err);
    }
  };

  const handleLocalChange = (id, field, value) => {
    dispatch(
      updateExperienceLocal({
        id,
        field,
        value,
      }),
    );
  };

  const handleBlurSave = (exp) => {
    dispatch(
      updateExperienceAsync({
        id: exp.id,
        data: exp,
      }),
    );
  };

  const handleRemove = (id) => {
    dispatch(deleteExperienceAsync(id));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Experience
      </h2>

      {experience.map((exp) => (
        <div
          key={exp.id}
          className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg
                     border border-white/50
                     shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                     space-y-4 transition-all duration-300"
        >
          <input
            type="text"
            placeholder="Company"
            className="w-full px-4 py-2.5 rounded-xl
                       bg-white/60 backdrop-blur-md
                       border border-slate-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            value={exp.company || ""}
            onChange={(e) =>
              handleLocalChange(exp.id, "company", e.target.value)
            }
            onBlur={() => handleBlurSave(exp)}
          />

          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2.5 rounded-xl
                       bg-white/60 backdrop-blur-md
                       border border-slate-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            value={exp.title || ""}
            onChange={(e) => handleLocalChange(exp.id, "title", e.target.value)}
            onBlur={() => handleBlurSave(exp)}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Start Year"
              className="w-full px-4 py-2.5 rounded-xl
                         bg-white/60 backdrop-blur-md
                         border border-slate-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              value={exp.start_year || ""}
              onChange={(e) =>
                handleLocalChange(exp.id, "start_year", e.target.value)
              }
              onBlur={() => handleBlurSave(exp)}
            />

            <input
              type="text"
              placeholder="End Year"
              className="w-full px-4 py-2.5 rounded-xl
                         bg-white/60 backdrop-blur-md
                         border border-slate-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              value={exp.end_year || ""}
              onChange={(e) =>
                handleLocalChange(exp.id, "end_year", e.target.value)
              }
              onBlur={() => handleBlurSave(exp)}
            />
          </div>

          <textarea
            placeholder="Description"
            className="w-full px-4 py-3 rounded-xl
                       bg-white/60 backdrop-blur-md
                       border border-slate-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                       h-28 resize-none"
            value={exp.description || ""}
            onChange={(e) =>
              handleLocalChange(exp.id, "description", e.target.value)
            }
            onBlur={() => handleBlurSave(exp)}
          />

          <button
            onClick={() => handleRemove(exp.id)}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="px-6 py-3 rounded-xl text-white font-medium
                   bg-gradient-to-r from-indigo-600 to-purple-600
                   shadow-lg shadow-indigo-500/20
                   hover:scale-105 hover:shadow-indigo-500/30
                   transition-all duration-200"
      >
        Add Experience
      </button>
    </div>
  );
}
