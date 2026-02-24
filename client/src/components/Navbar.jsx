import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import html2pdf from "html2pdf.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDownload = () => {
    const element = document.getElementById("cv-preview");
    if (!element) return;

    html2pdf()
      .set({
        margin: 0,
        filename: "ATS_CV.pdf",
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "px",
          format: [794, 1123], // Exact A4
          orientation: "portrait",
        },
      })
      .from(element)
      .save();
  };

  return (
    <div className="h-14 px-6 flex items-center justify-between border-b bg-white">
      <div className="text-lg font-semibold">CVForger</div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-black text-white text-sm rounded"
        >
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
