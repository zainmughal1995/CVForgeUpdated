import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-14 px-6 flex items-center justify-between border-b bg-white">
      <div className="text-lg font-semibold">CVForger</div>

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-black text-white text-sm rounded">
          Download
        </button>

        <span className="text-sm">{user?.email}</span>

        <button onClick={handleLogout} className="text-sm text-red-500">
          Logout
        </button>
      </div>
    </div>
  );
}
