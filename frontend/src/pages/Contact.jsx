import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access"));
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact | AI Job Portal</title>
      </Helmet>

      {isLoggedIn ? <Navbar /> : <PublicNavbar />}

      <div
        style={{
          minHeight: "85vh",
          background: "radial-gradient(circle at top,#1e3a8a,#020617 70%)",
          color: "white",
          padding: "70px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "30px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "50px",
                background: "linear-gradient(90deg,#60a5fa,#a78bfa)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Let's Connect 🚀
            </h1>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "18px",
                lineHeight: "1.7",
              }}
            >
              Have questions about AI hiring, recruitment automation or the
              platform? Feel free to contact us.
            </p>

            <div style={{ marginTop: "30px" }}>
              <Info
                icon="👨‍💻"
                title="Developer"
                value="Full Stack Python Developer"
              />

              <Info
                icon="📧"
                title="Email"
                value="yourmail@gmail.com"
              />

              <Info
                icon="💻"
                title="GitHub"
                value="github.com/yourusername"
              />

              <Info
                icon="🔗"
                title="LinkedIn"
                value="linkedin.com/in/yourusername"
              />
            </div>
          </div>

          <div
            style={{
              background: "rgba(15,23,42,.75)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,.1)",
              padding: "35px",
              borderRadius: "25px",
              boxShadow: "0 20px 50px rgba(0,0,0,.4)",
            }}
          >
            <h2>🌐 Portfolio</h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
              }}
            >
              View projects, skills and experience.
            </p>

            <div
              style={{
                marginTop: "30px",
                background: "#020617",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <h3>AI Job Portal</h3>

              <p style={{ color: "#94a3b8" }}>
                React + Django + AI powered recruitment system
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

function Info({ icon, title, value }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "30px" }}>{icon}</div>

      <div>
        <h3 style={{ margin: 0 }}>{title}</h3>

        <p
          style={{
            margin: 0,
            color: "#94a3b8",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}