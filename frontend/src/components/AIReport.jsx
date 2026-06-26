import { colors } from "../theme";

export default function AIReport({ analysis }) {
  if (!analysis) {
    return null;
  }

  const score = analysis.score || analysis.resume_score || 0;

  const getLevel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  const levelColor =
    score >= 80
      ? colors.success
      : score >= 60
      ? colors.warning
      : colors.danger;

  return (
    <div
      style={{
        marginTop: "25px",
        background: colors.card,
        borderRadius: "20px",
        padding: "25px",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
        color: colors.text,
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        🤖 AI Resume Report
      </h2>

      <h1
        style={{
          color: "#facc15",
          marginBottom: "10px",
        }}
      >
        {score}/100
      </h1>

      <p
        style={{
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        Status :
        <span
          style={{
            color: levelColor,
            fontWeight: "bold",
            marginLeft: "8px",
          }}
        >
          {getLevel()}
        </span>
      </p>

      <hr
        style={{
          border: "1px solid #334155",
        }}
      />

      <h3
        style={{
          marginTop: "20px",
        }}
      >
        🛠 Skills
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {analysis.skills?.length > 0 ? (
          analysis.skills.map((skill, index) => (
            <span
              key={index}
              style={{
                background: colors.primary,
                color: "white",
                padding: "8px 14px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {skill}
            </span>
          ))
        ) : (
          <p>No skills detected.</p>
        )}
      </div>

      {analysis.missing_skills?.length > 0 && (
        <>
          <h3
            style={{
              marginTop: "25px",
              color: colors.warning,
            }}
          >
            ⚠ Missing Skills
          </h3>

          <ul>
            {analysis.missing_skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </>
      )}

      <h3
        style={{
          marginTop: "25px",
        }}
      >
        💡 AI Suggestions
      </h3>

      <ul>
        {Array.isArray(analysis.suggestions) ? (
          analysis.suggestions.length > 0 ? (
            analysis.suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <li>No suggestions available.</li>
          )
        ) : analysis.suggestions ? (
          <li>{analysis.suggestions}</li>
        ) : (
          <li>No suggestions available.</li>
        )}
      </ul>
    </div>
  );
}