import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

export default function Home() {
  const isLoggedIn = !!localStorage.getItem("access");
  const role = localStorage.getItem("role");

  const dashboardLink =
    role === "recruiter"
      ? "/recruiter-dashboard"
      : "/dashboard";

  return (
    <>
      <Helmet>
        <title>AI Job Portal | Smart Hiring</title>

        <meta
          name="description"
          content="AI Powered Recruitment Platform"
        />
      </Helmet>

      {isLoggedIn ? <Navbar /> : <PublicNavbar />}

      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top,#1e3a8a,#020617 60%)",
          color: "white",
          overflow: "hidden",
        }}
      >
        {/* Hero */}
        <section
          style={{
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "60px 20px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(40px,7vw,80px)",
              maxWidth: "1000px",
              fontWeight: "800",
              lineHeight: "1.1",
              background:
                "linear-gradient(90deg,#60a5fa,#a78bfa)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            AI Powered Recruitment Platform 🚀
          </h1>

          <p
            style={{
              maxWidth: "750px",
              color: "#cbd5e1",
              marginTop: "25px",
              fontSize: "22px",
              lineHeight: "1.7",
            }}
          >
            Smart Resume Analysis, Candidate Ranking,
            Interview Generation and Job Recommendations.
          </p>

          <div
            style={{
              marginTop: "45px",
            }}
          >
            {isLoggedIn ? (
              <Link
                to={dashboardLink}
                style={primaryBtn}
              >
                Go To Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                style={primaryBtn}
              >
                Get Started Free
              </Link>
            )}
          </div>
        </section>

        {/* Features */}
        <section
          style={{
            padding: "70px 30px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "38px",
              marginBottom: "40px",
            }}
          >
            Platform Features
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "25px",
              maxWidth: "1100px",
              margin: "auto",
            }}
          >
            <Card
              title="🤖 Resume Analysis"
              desc="Analyze resumes using AI."
            />

            <Card
              title="🎯 Candidate Ranking"
              desc="Rank applicants automatically."
            />

            <Card
              title="📄 Interview Kit"
              desc="Generate interview questions."
            />

            <Card
              title="📊 Analytics"
              desc="Track hiring performance."
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

function Card({ title, desc }) {
  return (
    <div
      style={{
        background: "rgba(15,23,42,0.7)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "30px",
        borderRadius: "25px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
      }}
    >
      <h3
        style={{
          fontSize: "22px",
          marginBottom: "15px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#cbd5e1",
          fontSize: "16px",
        }}
      >
        {desc}
      </p>
    </div>
  );
}

const primaryBtn = {
  background:
    "linear-gradient(90deg,#2563eb,#7c3aed)",
  color: "white",
  textDecoration: "none",
  padding: "16px 38px",
  borderRadius: "999px",
  fontSize: "18px",
  fontWeight: "600",
  boxShadow:
    "0 10px 30px rgba(37,99,235,.4)",
};