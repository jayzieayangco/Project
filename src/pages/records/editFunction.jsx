import { useState } from "react";

export default function useEditFunction() {
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleTimeIn = () => {
    const now = new Date();
    setRecords((prev) => [
      ...prev,
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
          const diffMs = now.getTime() - new Date(updated[i].timeIn).getTime();
          const diffHours = (diffMs / (1000 * 60 * 60)).toFixed(2);
          updated[i] = { ...updated[i], timeOut: now, totalHours: diffHours };
          break;
        }
      }
      return updated;
    });
  };

  const handleActivityChange = (id, value) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, activity: value } : r))
    );
  };

 
  const handleManualTimeChange = (id, field, value) => {
    setRecords((prev) =>
      prev.map((record) => {
        if (record.id === id) {
          if (!value) return record; 

    
          const newDate = new Date(record[field] || record.timeIn || new Date());
          const [hours, minutes] = value.split(":").map(Number);
          newDate.setHours(hours, minutes, 0, 0);

          const updated = { ...record, [field]: newDate };

          if (updated.timeIn && updated.timeOut) {
            const diffMs = updated.timeOut.getTime() - updated.timeIn.getTime();
            updated.totalHours =
              diffMs > 0 ? (diffMs / (1000 * 60 * 60)).toFixed(2) : null;
          }

          return updated;
        }
        return record;
      })
    );
  };

  const toggleEditing = () => setIsEditing((prev) => !prev);

  return {
    records,
    isEditing,
    handleTimeIn,
    handleTimeOut,
    handleActivityChange,
    handleManualTimeChange,
    toggleEditing,
  };
}