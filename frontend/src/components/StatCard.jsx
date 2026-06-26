import { colors } from "../theme";

export default function StatCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: colors.card,
        borderRadius: "20px",
        padding: "25px",
        textAlign: "center",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
      }}
    >
      <h3
        style={{
          color: "#cbd5e1",
          marginBottom: "15px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: colors.success,
          fontSize: "40px",
          margin: 0,
        }}
      >
        {value ?? 0}
      </h1>
    </div>
  );
}