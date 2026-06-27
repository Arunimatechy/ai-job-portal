import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

export default function About() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access"));
  }, []);

  return (
    <>
      <Helmet>
        <title>About | AI Job Portal</title>
      </Helmet>

      {isLoggedIn ? <Navbar /> : <PublicNavbar />}

      <div
        style={{
          minHeight: "85vh",
          background: "radial-gradient(circle at top,#1e40af,#020617 70%)",
          color: "white",
          padding: "70px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            <h1
              style={{
                fontSize: "55px",
                fontWeight: "800",
                background:
                  "linear-gradient(90deg,#60a5fa,#c084fc)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              About AI Job Portal 🚀
            </h1>

            <p
              style={{
                maxWidth: "750px",
                margin: "20px auto",
                color: "#cbd5e1",
                fontSize: "20px",
                lineHeight: "1.7",
              }}
            >
              AI Job Portal is an intelligent recruitment platform built
              using React, Django REST Framework and Artificial Intelligence.
              It helps recruiters hire faster while enabling candidates to
              discover better career opportunities through AI-powered
              recommendations.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: "25px",
            }}
          >
            <Box
              title="🚀 Features"
              items={[
                "Resume Analysis",
                "AI Candidate Ranking",
                "AI Resume Screening",
                "Job Recommendations",
                "Interview Generation",
                "Recruiter Dashboard",
                "Analytics Dashboard",
              ]}
            />

            <Box
              title="🛠 Tech Stack"
              items={[
                "React.js",
                "Django REST Framework",
                "Python",
                "PostgreSQL",
                "JWT Authentication",
                "OpenRouter AI",
                "Cloudinary",
              ]}
            />
          </div>

          <div
            style={{
              marginTop: "40px",
              background: "rgba(15,23,42,.75)",
              backdropFilter: "blur(20px)",
              padding: "30px",
              borderRadius: "25px",
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            <h2>🎯 Our Mission</h2>

            <p
              style={{
                color: "#cbd5e1",
                lineHeight: "1.8",
              }}
            >
              Our mission is to simplify recruitment by combining Artificial
              Intelligence with modern web technologies. We empower recruiters
              to identify the best candidates quickly while helping job seekers
              find opportunities that match their skills and career goals.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

function Box({ title, items }) {
  return (
    <div
      style={{
        background: "rgba(15,23,42,.75)",
        backdropFilter: "blur(20px)",
        padding: "30px",
        borderRadius: "25px",
        border: "1px solid rgba(255,255,255,.1)",
        boxShadow: "0 20px 40px rgba(0,0,0,.3)",
      }}
    >
      <h2>{title}</h2>

      <ul
        style={{
          paddingLeft: "20px",
          color: "#cbd5e1",
          lineHeight: "2",
        }}
      >
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}