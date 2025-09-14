import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLogsheetById } from "../services/logsheetService";

export default function LogsheetDetails() {
  const { id } = useParams();
  const [logsheet, setLogsheet] = useState(null);

  useEffect(() => {
    getLogsheetById(id)
      .then((res) => setLogsheet(res.data))
      .catch((err) => console.error("Error fetching logsheet:", err));
  }, [id]);

  if (!logsheet) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Logsheet {logsheet.id} - {logsheet.date}</h2>

      <div className="bg-white p-4 shadow rounded mb-4">
        <p><strong>Driving:</strong> {logsheet.driving_hours}h</p>
        <p><strong>On Duty:</strong> {logsheet.on_duty_hours}h</p>
        <p><strong>Off Duty:</strong> {logsheet.off_duty_hours}h</p>
        <p><strong>Sleeper:</strong> {logsheet.sleeper_hours}h</p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Entries</h3>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Status</th>
            <th className="p-2">Start Time</th>
            <th className="p-2">End Time</th>
            <th className="p-2">Note</th>
          </tr>
        </thead>
        <tbody>
          {logsheet.entries.map((entry) => (
            <tr key={entry.id} className="border-b hover:bg-gray-100">
              <td className="p-2">{entry.status}</td>
              <td className="p-2">{entry.start_time}</td>
              <td className="p-2">{entry.end_time}</td>
              <td className="p-2">{entry.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
