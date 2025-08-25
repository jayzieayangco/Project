import { useNavigate } from "react-router-dom";
import useEditFunction from "./editFunction";
import { useCallback, useEffect, useState } from "react";
import {
  addTimeIn,
  fetchCurrentUserId,
  fetchTimeRecords,
  supabaseLogOut,
  updateTimeOut,
} from "./Service";
import toast from "react-hot-toast";

export default function Records() {
  const navigate = useNavigate();
  const handleReturn = async () => {
    const response = await supabaseLogOut();

    if (!response) return;

    navigate("/");
  }

  const [records, setRecords] = useState([]); // assuming array of records
  const [isEditing, setIsEditing] = useState(false);

  const loadTimeRecords = useCallback(async () => {
    const response = await fetchTimeRecords();

    if (!response) return;

    setRecords(response);
    toast.success("Fetched records successfully.");
  }, []);

  useEffect(() => {
    loadTimeRecords();
  }, []);

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
    // your logic here
  };

  const handleManualTimeChange = (id, timeField, newValue) => {
    // your logic here
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  function handleTimeTotal(timeIn, timeOut) {
    const formattedTimeIn = new Date(timeIn);
    const formattedTimeOut = new Date(timeOut);

    if (isNaN(formattedTimeIn) || isNaN(formattedTimeOut)) {
      return "Invalid time";
    }

    const timeTotal = formattedTimeOut - formattedTimeIn;
    const formattedTimeTotal = timeTotal / (1000 * 60 * 60);

    return formattedTimeTotal.toFixed(2);
  }

  // const {
  //   records,
  //   isEditing,
  //   handleTimeIn,
  //   handleTimeOut,
  //   handleActivityChange,
  //   handleManualTimeChange,
  //   toggleEditing,
  // } = useEditFunction();

  const formatTime = (time) => {
    if (!time) return "-";

    // Remove microseconds if present (e.g., ".287206")
    const cleanedTime = time.replace(/\.\d{6}/, "");

    const date = new Date(cleanedTime);
    if (isNaN(date)) return "Invalid time";

    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="h-screen overflow-hidden w-full flex flex-col items-center bg-[#faf5ef] p-8">
      <div className="w-full max-w-5xl mb-32">
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
                      {record.dtr_time_in
                        ? formatTime(record.dtr_time_in)
                        : "--:--"}
                    </td>
                    <td className="px-6 py-3 border">
                      {record.dtr_time_out
                        ? formatTime(record.dtr_time_out)
                        : "--:--"}
                    </td>
                    <td className="px-6 py-3 border">
                      {handleTimeTotal(record.dtr_time_in, record.dtr_time_out)}
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
