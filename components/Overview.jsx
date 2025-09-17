// components/Overview.jsx
import React from "react";

export default function Overview({ data }) {
  const n = data.length;
  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const avgScore = avg(data.map((d) => d.assessment_score));
  const avgComprehension = avg(data.map((d) => d.comprehension));
  const avgAttention = avg(data.map((d) => d.attention));
  const avgEngagement = avg(data.map((d) => d.engagement_time));

  const cardStyle = {
    padding: 14,
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    background: "#fff",
  };

  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
      <div style={{ ...cardStyle, flex: 1 }}>
        <div>Total students</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{n}</div>
      </div>
      <div style={{ ...cardStyle, flex: 1 }}>
        <div>Avg assessment score</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{avgScore.toFixed(1)}</div>
      </div>
      <div style={{ ...cardStyle, flex: 1 }}>
        <div>Avg comprehension</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{avgComprehension.toFixed(1)}</div>
      </div>
      <div style={{ ...cardStyle, flex: 1 }}>
        <div>Avg attention</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{avgAttention.toFixed(1)}</div>
      </div>
      <div style={{ ...cardStyle, flex: 1 }}>
        <div>Avg engagement (min/wk)</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{avgEngagement.toFixed(0)}</div>
      </div>
    </div>
  );
}
