import { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "candidate",
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
      await registerUser(form);

      toast.success("Account Created Successfully");

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.detail ||
          "Registration Failed"
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
      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          padding: "40px",
          borderRadius: "25px",
          background: "rgba(15,23,42,.75)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,.1)",
          boxShadow: "0 25px 60px rgba(0,0,0,.4)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            background:
              "linear-gradient(90deg,#60a5fa,#c084fc)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "10px",
          }}
        >
          Join AI Job Portal 🚀
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "25px",
          }}
        >
          Create your account
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#94a3b8",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,.1)",
  background: "#020617",
  color: "white",
  fontSize: "16px",
  outline: "none",
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