// components/StudentTable.jsx
import React, { useMemo, useState } from "react";

export default function StudentTable({ data }) {
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState({ key: "assessment_score", dir: "desc" });
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const lowq = q.trim().toLowerCase();
    let arr = data.filter(
      (d) =>
        !lowq ||
        d.name.toLowerCase().includes(lowq) ||
        d.student_id.toLowerCase().includes(lowq) ||
        (d.class && d.class.toLowerCase().includes(lowq))
    );
    arr = arr.slice(); // copy
    arr.sort((a, b) => {
      const ak = a[sortBy.key],
        bk = b[sortBy.key];
      if (ak === bk) return 0;
      return sortBy.dir === "asc" ? (ak < bk ? -1 : 1) : ak > bk ? -1 : 1;
    });
    return arr;
  }, [data, q, sortBy]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice(page * pageSize, page * pageSize + pageSize);

  const toggleSort = (key) => {
    if (sortBy.key === key)
      setSortBy({ key, dir: sortBy.dir === "asc" ? "desc" : "asc" });
    else setSortBy({ key, dir: "desc" });
  };

  return (
    <div
      style={{
        padding: 12,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}
      >
        <h3 style={{ margin: 0 }}>Students</h3>
        <input
          placeholder="Search name / id / class"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
        />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["student_id", "name", "class", "assessment_score"].map((col) => (
              <th
                key={col}
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: 6,
                  cursor: "pointer",
                }}
                onClick={() => toggleSort(col)}
              >
                {col} {sortBy.key === col ? (sortBy.dir === "asc" ? "↑" : "↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.map((d) => (
            <tr key={d.student_id}>
              <td style={{ padding: 6 }}>{d.student_id}</td>
              <td style={{ padding: 6 }}>{d.name}</td>
              <td style={{ padding: 6 }}>{d.class}</td>
              <td style={{ padding: 6 }}>{d.assessment_score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button disabled={page + 1 === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
