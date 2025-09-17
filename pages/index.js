// pages/index.js
import React, { useEffect, useState } from "react";
import Overview from "../components/Overview";
import Charts from "../components/Charts";
import RadarChart from "../components/RadarChart";
import StudentTable from "../components/StudentTable";

export default function Home() {
  const [data, setData] = useState([]);

  // Load CSV
  useEffect(() => {
    fetch("/student_cognitive_enriched.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const rows = csvText.split("\n").filter((r) => r.trim() !== "");
        const headers = rows[0].split(",");
        const items = rows.slice(1).map((row) => {
          const values = row.split(",");
          const obj = {};
          headers.forEach((h, i) => {
            const val = values[i];
            obj[h] =
              isNaN(val) || h === "student_id" || h === "name" || h === "class"
                ? val
                : Number(val);
          });
          return obj;
        });
        setData(items);
      });
  }, []);

  if (data.length === 0) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      <h1>Cognitive Skills Dashboard</h1>
      <Overview data={data} />
      <Charts data={data} />
      <RadarChart data={data} />
      <StudentTable data={data} />

      <div style={{ marginTop: 24, padding: 12, background: "#fff", borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
        <h3>Insights</h3>
        <ul>
          <li>Check the bar chart to see which skills correlate most with assessment score.</li>
          <li>Use the scatter chart to see how attention relates to performance.</li>
          <li>Explore each student’s radar chart to understand their cognitive profile.</li>
          <li>Sort and search the student table to find specific performance patterns.</li>
        </ul>
      </div>
    </div>
  );
}
