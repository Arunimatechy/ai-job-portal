export default function EmptyState({ message }) {
  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "20px",
        padding: "50px",
        marginTop: "25px",
        textAlign: "center",
        color: "#94a3b8",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        style={{
          fontSize: "55px",
          marginBottom: "15px",
        }}
      >
        📂
      </div>

      <h2
        style={{
          color: "white",
          marginBottom: "10px",
        }}
      >
        Nothing Found
      </h2>

      <p>{message}</p>
    </div>
  );
}