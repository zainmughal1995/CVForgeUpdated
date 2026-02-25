import { useDispatch, useSelector } from "react-redux";
import {
  createEducation,
  updateEducationAsync,
  updateEducationLocal,
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

  const handleLocalChange = (id, field, value) => {
    dispatch(
      updateEducationLocal({
        id,
        field,
        value,
      }),
    );
  };

  const handleBlurSave = (edu) => {
    dispatch(
      updateEducationAsync({
        id: edu.id,
        data: edu,
      }),
    );
  };

  const handleRemove = (id) => {
    dispatch(deleteEducationAsync(id));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Education
      </h2>

      {education.map((edu) => (
        <div
          key={edu.id}
          className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg
                     border border-white/50
                     shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                     space-y-4 transition-all duration-300"
        >
          <input
            type="text"
            placeholder="Institution"
            className="w-full px-4 py-2.5 rounded-xl
                       bg-white/60 backdrop-blur-md
                       border border-slate-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            value={edu.institution || ""}
            onChange={(e) =>
              handleLocalChange(edu.id, "institution", e.target.value)
            }
            onBlur={() => handleBlurSave(edu)}
          />

          <input
            type="text"
            placeholder="Degree"
            className="w-full px-4 py-2.5 rounded-xl
                       bg-white/60 backdrop-blur-md
                       border border-slate-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            value={edu.degree || ""}
            onChange={(e) =>
              handleLocalChange(edu.id, "degree", e.target.value)
            }
            onBlur={() => handleBlurSave(edu)}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Start Year"
              className="w-full px-4 py-2.5 rounded-xl
                         bg-white/60 backdrop-blur-md
                         border border-slate-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              value={edu.start_year || ""}
              onChange={(e) =>
                handleLocalChange(edu.id, "start_year", e.target.value)
              }
              onBlur={() => handleBlurSave(edu)}
            />

            <input
              type="text"
              placeholder="End Year"
              className="w-full px-4 py-2.5 rounded-xl
                         bg-white/60 backdrop-blur-md
                         border border-slate-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              value={edu.end_year || ""}
              onChange={(e) =>
                handleLocalChange(edu.id, "end_year", e.target.value)
              }
              onBlur={() => handleBlurSave(edu)}
            />
          </div>

          <button
            onClick={() => handleRemove(edu.id)}
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
        Add Education
      </button>
    </div>
  );
}
