import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../store/authSlice";
import api from "./../services/api";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/token/", {
        username: email,
        password: password,
      });

      const { access, refresh } = res.data;

      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);

      dispatch(
        setAuth({
          user: { email },
          token: access,
        }),
      );

      navigate("/builder");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
      <form
        onSubmit={handleLogin}
        className="w-96 p-10 rounded-3xl
                   bg-white/70 backdrop-blur-xl
                   border border-white/40
                   shadow-[0_20px_60px_rgba(0,0,0,0.1)]
                   space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-xl
                     bg-white/60 backdrop-blur-md
                     border border-slate-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                     transition-all"
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
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                     transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl text-white font-medium
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     shadow-lg shadow-indigo-500/20
                     hover:scale-[1.02] hover:shadow-indigo-500/30
                     transition-all duration-200"
        >
          Login
        </button>

        <div className="text-center text-sm text-slate-600">
          Don't have an account?
        </div>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full py-3 rounded-xl font-medium
                     bg-white text-slate-700
                     border border-slate-200
                     hover:bg-slate-50
                     transition-all duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}
