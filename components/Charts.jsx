// components/Charts.jsx
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from "recharts";

function pearson(x, y) {
  const n = x.length;
  const mx = x.reduce((a, b) => a + b, 0) / n;
  const my = y.reduce((a, b) => a + b, 0) / n;
  let num = 0,
    dx = 0,
    dy = 0;
  for (let i = 0; i < n; i++) {
    num += (x[i] - mx) * (y[i] - my);
    dx += (x[i] - mx) * (x[i] - mx);
    dy += (y[i] - my) * (y[i] - my);
  }
  return num / Math.sqrt(dx * dy);
}

export default function Charts({ data }) {
  const skills = ["comprehension", "attention", "focus", "retention", "engagement_time"];
  const corrData = useMemo(() => {
    const y = data.map((d) => d.assessment_score);
    return skills.map((s) => {
      const x = data.map((d) => d[s]);
      return { skill: s, corr: Number(pearson(x, y).toFixed(3)) };
    });
  }, [data]);

  const scatterData = data.map((d) => ({ attention: d.attention, score: d.assessment_score }));

  return (
    <div style={{ display: "flex", gap: 20, marginTop: 18 }}>
      <div style={{ flex: 1, padding: 12, background: "#fff", borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
        <h3>Skill vs Assessment (correlation)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={corrData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis domain={[-1, 1]} />
            <Tooltip />
            <Bar dataKey="corr" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ flex: 1, padding: 12, background: "#fff", borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
        <h3>Attention vs Assessment Score</h3>
        <ResponsiveContainer width="100%" height={240}>
          <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="attention" name="Attention" />
            <YAxis type="number" dataKey="score" name="Score" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Students" data={scatterData} fill="#82ca9d" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
