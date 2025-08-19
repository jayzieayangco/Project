import React, { useState } from "react";

export default function Records() {
  const [records, setRecords] = useState([]);

  const handleTimeIn = () => {
    const now = new Date();
    setRecords([
      ...records,
      {
        id: Date.now(),
        timeIn: now,
        timeOut: null,
        totalHours: null,
        activity: "",
      },
    ]);
  };

  const handleTimeOut = () => {
    const now = new Date();
    setRecords((prev) => {
      const updated = [...prev];
      for (let i = updated.length - 1; i >= 0; i--) {
        if (!updated[i].timeOut) {
          const diffMs = now.getTime() - updated[i].timeIn.getTime();
          const diffHours = (diffMs / (1000 * 60 * 60)).toFixed(2);
          updated[i] = {
            ...updated[i],
            timeOut: now,
            totalHours: diffHours,
          };
          break;
        }
      }
      return updated;
    });
  };

  const handleActivityChange = (id, value) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, activity: value } : record
      )
    );
  };

  const formatTime = (time) => (time ? time.toLocaleTimeString() : "-");

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "800px", margin: "auto" }}>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleTimeIn} style={{ marginRight: "10px" }}>
          Time In
        </button>
        <button onClick={handleTimeOut}>Time Out</button>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Total Hours</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No record
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id}>
                <td>{formatTime(record.timeIn)}</td>
                <td>{formatTime(record.timeOut)}</td>
                <td>{record.totalHours ?? "-"}</td>
                <td>
                  <input
                    type="text"
                    value={record.activity}
                    onChange={(e) => handleActivityChange(record.id, e.target.value)}
                    placeholder="ACTIVITY"
                    style={{ width: "100%" }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}