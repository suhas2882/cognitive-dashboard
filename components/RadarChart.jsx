// components/RadarChart.jsx
import React, { useState } from "react";
import {
  Radar, RadarChart as RC, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";

export default function RadarChart({ data }) {
  const [selected, setSelected] = useState(data[0]?.student_id);
  const student = data.find((d) => d.student_id === selected) || data[0];

  const skills = [
    { key: "comprehension", label: "Comprehension" },
    { key: "attention", label: "Attention" },
    { key: "focus", label: "Focus" },
    { key: "retention", label: "Retention" },
    { key: "engagement_time", label: "Engagement" }
  ];

  const chartData = skills.map((s) => ({ subject: s.label, A: student[s.key] }));

  return (
    <div style={{ padding: 12, background: "#fff", borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Student Profile</h3>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {data.map((d) => <option key={d.student_id} value={d.student_id}>{d.student_id} — {d.name}</option>)}
        </select>
      </div>

      <div style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RC cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name={student.name} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RC>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
