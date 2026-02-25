import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import html2pdf from "html2pdf.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDownload = async () => {
    const element = document.getElementById("cv-preview");
    if (!element) return;

    // Create wrapper
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "0";
    wrapper.style.top = "0";
    wrapper.style.width = "794px";
    wrapper.style.background = "#ffffff";
    wrapper.style.zIndex = "-1";
    wrapper.style.opacity = "0";

    const clone = element.cloneNode(true);
    clone.style.width = "794px";
    clone.style.margin = "0";

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Allow layout to complete
    await new Promise((resolve) => setTimeout(resolve, 100));

    await html2pdf()
      .set({
        margin: [0, 0, 10, 10], // real print margins
        filename: "ATS_CV.pdf",
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollY: 0,
        },
        jsPDF: {
          unit: "mm", // ✅ CRITICAL FIX
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(clone)
      .save();

    document.body.removeChild(wrapper);
  };

  return (
    <div
      className="h-16 px-8 flex items-center justify-between 
                    bg-white/70 backdrop-blur-xl 
                    border-b border-white/40 
                    shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
    >
      {/* Logo */}
      <div
        className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 
                      bg-clip-text text-transparent tracking-tight"
      >
        CVForger
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="px-5 py-2.5 text-sm font-medium rounded-xl
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     text-white shadow-lg shadow-indigo-500/20
                     hover:scale-105 hover:shadow-indigo-500/30
                     transition-all duration-200"
        >
          Download
        </button>

        {/* User Email */}
        <div
          className="px-4 py-2 text-sm rounded-xl
                        bg-white/60 backdrop-blur-md
                        border border-white/50
                        shadow-inner"
        >
          {user?.email}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-sm font-medium px-4 py-2 rounded-xl
                     bg-red-500/10 text-red-600
                     hover:bg-red-500/20
                     transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
