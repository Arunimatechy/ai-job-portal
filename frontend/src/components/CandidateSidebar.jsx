import { Link } from "react-router-dom";

export default function CandidateSidebar() {
  return (
    <div
      style={{
        width: "240px",
        background: "#0f172a",
        color: "white",
        padding: "25px",
        borderRight: "1px solid #1e293b",
      }}
    >
      <h2>AI Jobs</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "40px",
        }}
      >
        <Menu to="/dashboard" text="📊 Dashboard" />
        <Menu to="/jobs" text="💼 Jobs" />
        <Menu to="/my-applications" text="📄 Applications" />
        <Menu to="/resume" text="📑 Resume" />
        <Menu to="/recommended-jobs" text="🤖 AI Jobs" />
        <Menu
  to="/my-interviews"
  text="📅 My Interviews"
/>
<Menu
  to="/mock-interview"
  text="🎥 AI Mock Interview"
/>
      </div>
    </div>
  );
}

function Menu({ to, text }) {
  return (
    <Link
      to={to}
      style={{
        color: "#cbd5e1",
        textDecoration: "none",
        padding: "12px",
        borderRadius: "10px",
        background: "#1e293b",
      }}
    >
      {text}
    </Link>
  );
}