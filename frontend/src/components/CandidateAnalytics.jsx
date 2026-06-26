import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { colors } from "../theme";

export default function CandidateAnalytics({ dashboard }) {
  if (!dashboard) {
    return null;
  }

  const data = [
    {
      name: "Applications",
      value: dashboard?.total_applications || 0,
    },
    {
      name: "Recommended Jobs",
      value: dashboard?.recommended_jobs || 0,
    },
  ];

  const chartColors = [colors.primary, colors.success];

  return (
    <div
      style={{
        background: colors.card,
        borderRadius: "20px",
        padding: "25px",
        marginTop: "25px",
        color: colors.text,
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        📊 Career Analytics
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={chartColors[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}