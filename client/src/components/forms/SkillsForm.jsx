import { useDispatch, useSelector } from "react-redux";
import { addSkill, removeSkill } from "../../store/cvSlice";
import { useState } from "react";

export default function SkillsForm() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.cv.skills);
  const [skillInput, setSkillInput] = useState("");

  const handleAdd = () => {
    if (!skillInput.trim()) return;

    dispatch(addSkill(skillInput.trim()));
    setSkillInput("");
  };

  const handleRemove = (skill) => {
    dispatch(removeSkill(skill));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Skills</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add skill"
          className="w-full border p-2 rounded"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="px-4 bg-black text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="px-3 py-1 bg-gray-200 rounded text-sm flex items-center gap-2"
          >
            {skill}
            <button
              onClick={() => handleRemove(skill)}
              className="text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
