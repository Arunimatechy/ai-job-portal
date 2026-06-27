


import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#020617",
        color: "#cbd5e1",
        borderTop: "1px solid rgba(255,255,255,.08)",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "60px 30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "40px",
        }}
      >
        {/* Logo */}
        <div>
          <h2
            style={{
              color: "#60a5fa",
              marginBottom: "15px",
            }}
          >
            🚀 AI Job Portal
          </h2>

          <p
            style={{
              color: "#94a3b8",
              lineHeight: "1.8",
            }}
          >
            AI-powered recruitment platform that helps recruiters
            hire faster and candidates find better opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            style={{
              color: "white",
              marginBottom: "18px",
            }}
          >
            Quick Links
          </h3>

          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/jobs">Jobs</FooterLink>
        </div>

        {/* Features */}
        <div>
          <h3
            style={{
              color: "white",
              marginBottom: "18px",
            }}
          >
            Features
          </h3>

          <p style={text}>✔ AI Resume Screening</p>
          <p style={text}>✔ Candidate Ranking</p>
          <p style={text}>✔ Mock Interviews</p>
          <p style={text}>✔ Analytics Dashboard</p>
        </div>

        {/* Tech Stack */}
        <div>
          <h3
            style={{
              color: "white",
              marginBottom: "18px",
            }}
          >
            Built With
          </h3>

          <p style={text}>⚛ React.js</p>
          <p style={text}>🐍 Django REST Framework</p>
          <p style={text}>🗄 PostgreSQL</p>
          <p style={text}>🤖 OpenRouter AI</p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.08)",
          padding: "20px",
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        <p>
          © {new Date().getFullYear()} AI Job Portal. All Rights Reserved.
        </p>

        <p
          style={{
            marginTop: "8px",
          }}
        >
          Built with ❤️ using React + Django + AI
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        display: "block",
        color: "#94a3b8",
        textDecoration: "none",
        marginBottom: "12px",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.target.style.color = "#60a5fa";
      }}
      onMouseLeave={(e) => {
        e.target.style.color = "#94a3b8";
      }}
    >
      {children}
    </Link>
  );
}

const text = {
  color: "#94a3b8",
  marginBottom: "12px",
};





