import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ error state

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // reset previous errors

    try {
      const res = await api.post("/register/", {
        username: email,
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/builder");
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.email?.[0] ||
        err.response?.data?.username?.[0] ||
        "Registration failed";

      setError(message); // ✅ show error
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
      <form
        onSubmit={handleRegister}
        className="w-96 p-10 rounded-3xl
                   bg-white/70 backdrop-blur-xl
                   border border-white/40
                   shadow-[0_20px_60px_rgba(0,0,0,0.1)]
                   space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </h2>

        {error && (
          <div className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded-xl">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-xl
                     bg-white/60 backdrop-blur-md
                     border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl
                     bg-white/60 backdrop-blur-md
                     border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl text-white font-medium
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     shadow-lg shadow-indigo-500/20
                     hover:scale-[1.02] transition-all"
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full py-3 rounded-xl font-medium
                     bg-white text-slate-700
                     border border-slate-200"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
