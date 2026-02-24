import { useDispatch, useSelector } from "react-redux";
import { updatePersonal } from "../../store/cvSlice";

export default function PersonalForm() {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.cv.personal);

  const handleChange = (field, value) => {
    dispatch(updatePersonal({ [field]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Personal Information</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-2 rounded"
        value={personal.fullName}
        onChange={(e) => handleChange("fullName", e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={personal.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        type="text"
        placeholder="Phone"
        className="w-full border p-2 rounded"
        value={personal.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />

      <input
        type="text"
        placeholder="Location"
        className="w-full border p-2 rounded"
        value={personal.location}
        onChange={(e) => handleChange("location", e.target.value)}
      />

      <textarea
        placeholder="Professional Summary"
        className="w-full border p-2 rounded h-24"
        value={personal.summary}
        onChange={(e) => handleChange("summary", e.target.value)}
      />
    </div>
  );
}
