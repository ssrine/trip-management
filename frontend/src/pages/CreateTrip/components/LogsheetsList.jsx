import React from "react";

const LogsheetsList = ({ activeTab, logsheetsData }) => {
  if (activeTab !== "logsheets" || logsheetsData.length === 0) return null;

  return (
    <div className="mb-6 animate-fadeIn">
      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-blue-700">Your Logsheets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {logsheetsData.map((logsheet) => (
          <div key={logsheet.id} className="p-3 md:p-4 border rounded bg-white shadow transition-all duration-300 hover:shadow-lg">
            <h4 className="font-bold mb-2 text-blue-600 text-sm md:text-base">Logsheet #{logsheet.id}</h4>
            <div className="text-xs md:text-sm">
              {Object.entries(logsheet).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b py-1">
                  <span className="font-medium truncate mr-2">{key.replace(/_/g, " ")}:</span>
                  <span className="truncate">{typeof value === "object" ? JSON.stringify(value) : value}</span>
                </div>
              ))}
              {Object.entries(logsheet).length > 4 && (
                <div className="text-center mt-2 text-blue-500 text-xs">
                  +{Object.entries(logsheet).length - 4} more fields
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsheetsList;