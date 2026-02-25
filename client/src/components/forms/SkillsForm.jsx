import { useDispatch, useSelector } from "react-redux";
import { createSkill, deleteSkillAsync } from "../../store/cvSlice";
import { useState } from "react";

export default function SkillsForm() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.cv.skills);
  const [skillInput, setSkillInput] = useState("");

  const handleAdd = () => {
    if (!skillInput.trim()) return;

    dispatch(createSkill({ name: skillInput.trim() }));
    setSkillInput("");
  };

  const handleRemove = (id) => {
    dispatch(deleteSkillAsync(id));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Skills
      </h2>

      {/* Add Skill */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Add skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl
                     bg-white/60 backdrop-blur-md
                     border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                     transition-all"
        />

        <button
          onClick={handleAdd}
          className="px-6 py-2.5 rounded-xl text-white font-medium
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     shadow-lg shadow-indigo-500/20
                     hover:scale-105 hover:shadow-indigo-500/30
                     transition-all duration-200"
        >
          Add
        </button>
      </div>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="px-4 py-1.5 rounded-full text-sm font-medium
                       bg-white/70 backdrop-blur-md
                       border border-white/60
                       shadow-md
                       flex items-center gap-2 transition-all duration-200"
          >
            {skill.name}

            <button
              onClick={() => handleRemove(skill.id)}
              className="text-red-500 hover:text-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
