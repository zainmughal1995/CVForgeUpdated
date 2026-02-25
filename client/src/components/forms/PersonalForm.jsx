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

  // Sync form when CV loads from DB
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

    // 🔥 Instant Redux preview (local only)
    dispatch(updateLocalPersonal(updated));
  };

  const handleBlur = () => {
    dispatch(savePersonal(form)); // 🔥 Persist to DB
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Personal Information</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-2 rounded"
        value={form.full_name}
        onChange={(e) => handleChange("full_name", e.target.value)}
        onBlur={handleBlur}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={handleBlur}
      />

      <input
        type="text"
        placeholder="Phone"
        className="w-full border p-2 rounded"
        value={form.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        onBlur={handleBlur}
      />

      <input
        type="text"
        placeholder="Location"
        className="w-full border p-2 rounded"
        value={form.location}
        onChange={(e) => handleChange("location", e.target.value)}
        onBlur={handleBlur}
      />

      <textarea
        placeholder="Professional Summary"
        className="w-full border p-2 rounded h-24"
        value={form.summary}
        onChange={(e) => handleChange("summary", e.target.value)}
        onBlur={handleBlur}
      />
    </div>
  );
}
