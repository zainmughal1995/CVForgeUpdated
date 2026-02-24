import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // temporary mock register
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Register</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
