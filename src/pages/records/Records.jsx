import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  addTimeIn,
  fetchCurrentUserId,
  fetchTimeRecords,
  supabaseLogOut,
  updateTimeOut,
} from "./Service";
import supabase from "../../supabase/supabase-client";
import toast from "react-hot-toast";

export default function Records() {
  const navigate = useNavigate();
  const handleReturn = async () => {
    const response = await supabaseLogOut();

    if (!response) return;

    navigate("/");
  };
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const loadTimeRecords = useCallback(async () => {
    const response = await fetchTimeRecords();
    if (!response) return;
    setRecords(response);
  }, []);

  useEffect(() => {
    loadTimeRecords();
  }, [loadTimeRecords]);

  async function handleTimeIn() {
    const response = await addTimeIn();
    if (!response) return;
    loadTimeRecords();
  }

  async function handleTimeOut() {
    const response = await updateTimeOut();
    if (!response) return;
    loadTimeRecords();
  }

  const handleActivityChange = (id, newActivity) => {
    setRecords((prev) =>
      prev.map((r) => (r.dtr_id === id ? { ...r, activities: newActivity } : r))
    );
  };

  const handleSubmit = async (id) => {
    const record = records.find((r) => r.dtr_id === id);
    if (!record) return;

    const { error } = await supabase
      .from("daily_time_record")
      .update({ activities: record.activities }) 
      .eq("dtr_id", id);

    if (error) {
      console.error("Error updating record:", error.message);
      toast.error("Failed to update activity");
    } else {
      toast.success("Activity updated successfully!");
    }
  };

  function formatTime(time) {
    if (!time) return "--:--";
    const cleanedTime = time.replace(/\.\d{6}/, "");
    const date = new Date(cleanedTime);
    if (isNaN(date)) return "Invalid";
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function handleTimeTotal(timeIn, timeOut) {
    const formattedTimeIn = new Date(timeIn);
    const formattedTimeOut = new Date(timeOut);
    if (isNaN(formattedTimeIn) || isNaN(formattedTimeOut)) return "-";
    const timeTotal = formattedTimeOut - formattedTimeIn;
    return (timeTotal / (1000 * 60 * 60)).toFixed(2);
  }

  return (
    <div className="h-screen overflow-hidden w-full flex flex-col items-center bg-[#faf5ef] p-6">
      <div className="fixed w-full max-w-5xl">

        <div
          className="overflow-y-auto custom-scrollbar"
          style={{ maxHeight: "486px" }}
        >
          <table className="table-auto border-collapse w-full shadow-lg">
            <thead className="sticky top-0 z-10 bg-green-600 text-white">
              <tr>
                <th className="px-6 py-3 border">Date</th>
                <th className="px-6 py-3 border">Time In</th>
                <th className="px-6 py-3 border">Time Out</th>
                <th className="px-6 py-3 border">Total Hours</th>
                <th className="px-6 py-3 border">Activity</th>
                <th className="px-6 py-3 border">Save</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No records
                  </td>
                </tr>
              ) : (
                records.map((record, index) => (
                  <tr
                    key={record.dtr_id}
                    className={
                      index % 2 === 0
                        ? "bg-white text-center"
                        : "bg-gray-50 text-center"
                    }
                  >
                    <td className="px-6 py-3 border">
                      {formatDate(record.dtr_date)}
                    </td>
                    <td className="px-6 py-3 border">
                      {formatTime(record.dtr_time_in)}
                    </td>
                    <td className="px-6 py-3 border">
                      {formatTime(record.dtr_time_out)}
                    </td>
                    <td className="px-6 py-3 border">
                      {handleTimeTotal(
                        record.dtr_time_in,
                        record.dtr_time_out
                      )}
                    </td>
                    <td className="px-6 py-3 border">
                      <textarea
                        value={record.activities || ""} 
                        onChange={(e) =>
                          handleActivityChange(record.dtr_id, e.target.value)
                        }
                        className="border rounded p-1 w-full resize-none"
                      />
                    </td>
                    <td className="px-6 py-3 border">
                      <button
                        onClick={() => handleSubmit(record.dtr_id)}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex fixed justify-center p-4">
          <div className="space-x-4">
            <button
              onClick={handleTimeIn}
              className="fixed left-130 bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Time In
            </button>
            <button
              onClick={handleTimeOut}
              className="fixed left-160 bg-green-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Time Out
            </button>
          </div>
          <button
            onClick={handleReturn}
            className="bg-green-600 fixed bottom-6 right-6 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Log Out
          </button>
        </div>

      </div>
    </div>
  );
}