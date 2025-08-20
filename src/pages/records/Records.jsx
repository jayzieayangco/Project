import React from "react";
import { useNavigate } from "react-router-dom";
import useEditFunction from "./editFunction";

export default function Records() {
  const navigate = useNavigate();
  const handleReturn = () => navigate("/");

  const {
    records,
    isEditing,
    handleTimeIn,
    handleTimeOut,
    handleActivityChange,
    handleManualTimeChange,
    toggleEditing,
  } = useEditFunction();

  const formatTime = (time) =>
    time instanceof Date
      ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "-";

  return (
    <div className="h-screen overflow-hidden w-full flex flex-col items-center bg-[#faf5ef] p-8">
      <div className="w-full max-w-5xl mb-32">
        <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: "455px" }}>
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
                    No records
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
                      {isEditing ? (
                        <input
                          type="time"
                          value={
                            record.timeIn
                              ? record.timeIn.toTimeString().slice(0, 5)
                              : ""
                          }
                          onChange={(e) =>
                            handleManualTimeChange(record.id, "timeIn", e.target.value)
                          }
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        formatTime(record.timeIn)
                      )}
                    </td>
                    <td className="px-6 py-3 border">
                      {isEditing ? (
                        <input
                          type="time"
                          value={
                            record.timeOut
                              ? record.timeOut.toTimeString().slice(0, 5)
                              : ""
                          }
                          onChange={(e) =>
                            handleManualTimeChange(record.id, "timeOut", e.target.value)
                          }
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        formatTime(record.timeOut)
                      )}
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

      <div className="fixed bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
        {!isEditing && (
          <>
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
          </>
        )}
        <button
          onClick={toggleEditing}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      {!isEditing && (
        <button
          onClick={handleReturn}
          className="fixed bottom-6 right-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors z-30"
        >
          Go Back
        </button>
      )}
    </div>
  );
}