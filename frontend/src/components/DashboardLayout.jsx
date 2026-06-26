import { useSelector } from "react-redux";

import CandidateSidebar from "./CandidateSidebar";
import RecruiterSidebar from "./RecruiterSidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}) {
  const role = useSelector(
    (state) => state.auth.role
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
      }}
    >
      {role === "recruiter" ? (
        <RecruiterSidebar />
      ) : (
        <CandidateSidebar />
      )}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <div
          style={{
            padding: "25px",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}