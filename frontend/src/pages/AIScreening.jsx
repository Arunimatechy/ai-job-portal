import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getAIScreening } from "../api/aiScreeningApi";

export default function AIScreening() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const result =
        await getAIScreening();

      setData(
        Array.isArray(result)
          ? result
          : []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <DashboardLayout>

      <div
        style={{
          padding: "30px",
          color: "white"
        }}
      >

        <h1
          style={{
            background:
              "linear-gradient(90deg,#60a5fa,#c084fc)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "30px"
          }}
        >
          🏆 AI Screening
        </h1>

        {
          loading ? (

            <div style={emptyCard}>
              Loading...
            </div>

          ) : data.length === 0 ? (

            <div style={emptyCard}>
              No screening results found
            </div>

          ) : (

            data.map((item, index) => (

              <div
                key={`${item.candidate}-${item.job}-${index}`}
                style={{
                  background:
                    "rgba(15,23,42,.75)",
                  backdropFilter:
                    "blur(20px)",
                  border:
                    "1px solid rgba(255,255,255,.1)",
                  borderRadius: "25px",
                  padding: "30px",
                  marginTop: "20px",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,.35)"
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px"
                  }}
                >

                  <h2>
                    👤 {item.candidate}
                  </h2>

                  <span
                    style={{
                      background:
                        item.decision ===
                          "Shortlist" ||
                        item.decision ===
                          "Accept"
                          ? "linear-gradient(90deg,#22c55e,#16a34a)"
                          : "linear-gradient(90deg,#ef4444,#dc2626)",

                      padding: "10px 18px",
                      borderRadius: "999px",
                      fontWeight: "700"
                    }}
                  >
                    {item.decision}
                  </span>

                </div>

                <div style={boxStyle}>
                  💼 Job:
                  <strong>
                    {" "}
                    {item.job}
                  </strong>
                </div>

                <div style={boxStyle}>
                  🎯 AI Score:
                  <strong
                    style={{
                      color: "#60a5fa"
                    }}
                  >
                    {" "}
                    {item.score}%
                  </strong>
                </div>

                <div style={boxStyle}>
                  💪 Strengths:
                  <p>
                    {
                      item.strengths?.length
                        ? item.strengths.join(", ")
                        : "None"
                    }
                  </p>
                </div>

                <div style={boxStyle}>
                  ⚠ Missing Skills:
                  <p>
                    {
                      item.missing_skills?.length
                        ? item.missing_skills.join(", ")
                        : "None"
                    }
                  </p>
                </div>

              </div>

            ))
          )
        }

      </div>

    </DashboardLayout>
  );
}

const boxStyle = {
  background: "#020617",
  padding: "15px",
  borderRadius: "15px",
  marginTop: "15px",
  color: "#cbd5e1"
};

const emptyCard = {
  background:
    "rgba(15,23,42,.7)",
  padding: "30px",
  borderRadius: "20px",
  color: "#94a3b8"
};