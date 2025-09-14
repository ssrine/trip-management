import React from "react";

const EntriesTable = ({ activeTab, entriesData }) => {
  if (activeTab !== "entries" || entriesData.length === 0) return null;

  return (
    <div className="mb-6 p-4 md:p-5 border rounded bg-blue-50 animate-fadeIn">
      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-blue-700">All Entries</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-xs md:text-sm">
          <thead className="bg-blue-200">
            <tr>
              <th className="border p-1 md:p-2 text-left">ID</th>
              <th className="border p-1 md:p-2 text-left">Logsheet</th>
              <th className="border p-1 md:p-2 text-left">Note</th>
              <th className="border p-1 md:p-2 text-left">Status</th>
              <th className="border p-1 md:p-2 text-left hidden md:table-cell">Start</th>
              <th className="border p-1 md:p-2 text-left hidden md:table-cell">End</th>
            </tr>
          </thead>
          <tbody>
            {entriesData.map((entry) => (
              <tr key={entry.id} className="hover:bg-blue-100 transition-colors duration-200">
                <td className="border p-1 md:p-2">{entry.id}</td>
                <td className="border p-1 md:p-2">{entry.logsheet}</td>
                <td className="border p-1 md:p-2 truncate max-w-xs">{entry.note}</td>
                <td className="border p-1 md:p-2">
                  <span className={`px-1 md:px-2 py-1 rounded-full text-xs ${
                    entry.status === "Driving" ? "bg-blue-100 text-blue-800" :
                    entry.status === "Off Duty" ? "bg-green-100 text-green-800" :
                    entry.status === "On Duty" ? "bg-yellow-100 text-yellow-800" :
                    "bg-purple-100 text-purple-800"
                  }`}>
                    {entry.status}
                  </span>
                </td>
                <td className="border p-1 md:p-2 hidden md:table-cell">{new Date(entry.start_time).toLocaleString()}</td>
                <td className="border p-1 md:p-2 hidden md:table-cell">{new Date(entry.end_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntriesTable;