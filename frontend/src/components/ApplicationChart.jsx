import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { colors } from "../theme";

export default function ApplicationChart({ stats }) {
  if (!stats) {
    return (
      <div
        style={{
          background: "rgba(15,23,42,.75)",
          borderRadius: "25px",
          padding: "30px",
          marginTop: "25px",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2>📊 Applications Analytics</h2>
        <p>No analytics available.</p>
      </div>
    );
  }

  const data = [
    {
      name: "Pending",
      value: stats?.pending || 0,
    },
    {
      name: "Shortlisted",
      value: stats?.shortlisted || 0,
    },
    {
      name: "Rejected",
      value: stats?.rejected || 0,
    },
  ];

  return (
    <div
      style={{
        background: "rgba(15,23,42,.75)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: "25px",
        padding: "30px",
        marginTop: "25px",
        boxShadow: "0 20px 50px rgba(0,0,0,.35)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "white",
          }}
        >
          📊 Applications Analytics
        </h2>

        <span
          style={{
            background: colors.primary,
            color: "white",
            padding: "8px 15px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          AI Dashboard
        </span>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="name"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "white",
            }}
          />

          <Bar
            dataKey="value"
            fill={colors.primary}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}