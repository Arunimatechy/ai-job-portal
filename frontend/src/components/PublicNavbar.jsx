import { Link } from "react-router-dom";

export default function PublicNavbar() {
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


      <div
        style={{
          display: "flex",
          gap: "28px",
          alignItems: "center",
        }}
      >

        <Link to="/" style={linkStyle}>
          Home
        </Link>


        <Link to="/about" style={linkStyle}>
          About
        </Link>


        <Link to="/contact" style={linkStyle}>
          Contact
        </Link>


        <Link to="/login" style={linkStyle}>
          Login
        </Link>


        <Link
          to="/register"
          style={{
            background:
              "linear-gradient(90deg,#2563eb,#7c3aed)",
            color: "white",
            textDecoration: "none",
            padding: "12px 25px",
            borderRadius: "999px",
            fontWeight: "700",
          }}
        >
          Register
        </Link>

      </div>

    </nav>
  );
}


const linkStyle = {
  color: "#cbd5e1",
  textDecoration: "none",
  fontWeight: "600",
};