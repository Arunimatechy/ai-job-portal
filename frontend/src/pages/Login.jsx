import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../api/authApi";
import { loginSuccess } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await loginUser(form);

      dispatch(
        loginSuccess({
          access: data.access,
          refresh: data.refresh,
          role: data.role,
          user: data.user,
        })
      );

      toast.success("Login Successful");

      if (data.role?.toLowerCase() === "recruiter") {
        navigate("/recruiter-dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || "Invalid Credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top,#1e40af,#020617 70%)",
        padding: "20px",
      }}
    >
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={titleStyle}>Welcome Back 🚀</h1>

        <p style={subTitleStyle}>
          Login to AI Job Portal
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#94a3b8",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

const formStyle = {
  width: "380px",
  padding: "40px",
  borderRadius: "25px",
  background: "rgba(15,23,42,.75)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,.1)",
  boxShadow: "0 25px 60px rgba(0,0,0,.4)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "10px",
  background: "linear-gradient(90deg,#60a5fa,#c084fc)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const subTitleStyle = {
  textAlign: "center",
  color: "#94a3b8",
  marginBottom: "30px",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,.1)",
  background: "#020617",
  color: "white",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  marginTop: "25px",
  padding: "14px",
  background: "linear-gradient(90deg,#2563eb,#7c3aed)",
  color: "white",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "16px",
};