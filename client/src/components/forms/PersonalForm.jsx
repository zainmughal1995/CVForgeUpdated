import { useDispatch, useSelector } from "react-redux";
import { savePersonal, updateLocalPersonal } from "../../store/cvSlice";
import { useEffect, useState } from "react";

export default function PersonalForm() {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.cv.personal);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  useEffect(() => {
    if (personal) {
      setForm({
        full_name: personal.full_name || "",
        email: personal.email || "",
        phone: personal.phone || "",
        location: personal.location || "",
        summary: personal.summary || "",
      });
    }
  }, [personal]);

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    dispatch(updateLocalPersonal(updated)); // instant preview
  };

  const handleBlur = () => {
    dispatch(savePersonal(form)); // persist to DB
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Personal Information
      </h2>

      <div className="space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) => handleChange("full_name", e.target.value)}
          onBlur={handleBlur}
          className="w-full px-4 py-2.5 rounded-xl
                     bg-white/60 backdrop-blur-md
                     border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                     transition-all"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={handleBlur}
          className="w-full px-4 py-2.5 rounded-xl
                     bg-white/60 backdrop-blur-md
                     border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                     transition-all"
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          onBlur={handleBlur}
          className="w-full px-4 py-2.5 rounded-xl
                     bg-white/60 backdrop-blur-md
                     border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                     transition-all"
        />

        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => handleChange("location", e.target.value)}
          onBlur={handleBlur}
          className="w-full px-4 py-2.5 rounded-xl
                     bg-white/60 backdrop-blur-md
                     border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                     transition-all"
        />

        <textarea
          placeholder="Professional Summary"
          value={form.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          onBlur={handleBlur}
          className="w-full px-4 py-3 rounded-xl
                     bg-white/60 backdrop-blur-md
                     border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                     transition-all h-32 resize-none"
        />
      </div>
    </div>
  );
}
