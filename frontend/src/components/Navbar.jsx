import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <nav
      style={{
        height: "80px",
        background: "rgba(2,6,23,.85)",
        backdropFilter: "blur(20px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 50px",
        borderBottom: "1px solid rgba(255,255,255,.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          color: "#60a5fa",
          textDecoration: "none",
          fontSize: "26px",
          fontWeight: "800",
        }}
      >
        🚀 AI Job Portal
      </Link>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={logoutBtn}
      >
        Logout
      </button>
    </nav>
  );
}

const logoutBtn = {
  background: "linear-gradient(90deg,#ef4444,#dc2626)",
  color: "white",
  border: "none",
  padding: "12px 25px",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "15px",
};