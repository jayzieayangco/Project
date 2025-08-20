import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Records() {
  const [records, setRecords] = useState([]);

  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

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
    <div className="h-screen overflow-y-auto w-full flex flex-col items-center bg-[#faf5ef] p-8">

      <div className="w-full max-w-5xl">
        <div
          className="overflow-y-auto custom-scrollbar"
          style={{ maxHeight: "455px" }} 
        >
          <table className="table-auto border-collapse w-full shadow-lg">
            <thead className="sticky top-0 z-10 bg-green-600 text-white">
              <tr>
                <th className="px-6 py-3 border">Time In</th>
                <th className="px-6 py-3 border">Time Out</th>
                <th className="px-6 py-3 border">Total Hours</th>
                <th className="px-6 py-3 border">Activity</th>
              </tr>
            </thead>

            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No records yet
                  </td>
                </tr>
              ) : (
                records.map((record, index) => (
                  <tr
                    key={record.id}
                    className={
                      index % 2 === 0
                        ? "bg-white text-center"
                        : "bg-gray-50 text-center"
                    }
                  >
                    <td className="px-6 py-3 border">
                      {formatTime(record.timeIn)}
                    </td>
                    <td className="px-6 py-3 border">
                      {formatTime(record.timeOut)}
                    </td>
                    <td className="px-6 py-3 border">
                      {record.totalHours ?? "-"}
                    </td>
                    <td className="px-6 py-3 border">
                      <input
                        type="text"
                        value={record.activity}
                        onChange={(e) =>
                          handleActivityChange(record.id, e.target.value)
                        }
                        className="border rounded p-1 w-full"
                        placeholder=""
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="fixed bottom-6 mt-50 flex justify-center space-x-3">
        <button
          onClick={handleTimeIn}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Time In
        </button>
        <button
          onClick={handleTimeOut}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Time Out
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
          Edit
        </button>

        <button
          onClick={handleReturn}
          className="fixed right-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}