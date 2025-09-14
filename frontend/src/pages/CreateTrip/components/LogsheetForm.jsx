import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClipboardList, 
  faSpinner, 
  faClock,
  faCalendarDay,
  faFileInvoice,
  faBox,
  faUser,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

const LogsheetForm = ({ activeTab, tripData, newLogsheetData, handleLogsheetChange, submitLogsheet, isLoading }) => {
  if (activeTab !== "logsheets" || !tripData) return null;

  const fieldConfig = {
    date: { icon: faCalendarDay, label: "DATE", type: "date" },
    driving_hours: { icon: faClock, label: "DRIVING HOURS", type: "number" },
    on_duty_hours: { icon: faClock, label: "ON DUTY HOURS", type: "number" },
    off_duty_hours: { icon: faClock, label: "OFF DUTY HOURS", type: "number" },
    sleeper_hours: { icon: faClock, label: "SLEEPER HOURS", type: "number" },
    hours_left_in_cycle: { icon: faClock, label: "HOURS LEFT IN CYCLE", type: "number" },
    bol_number: { icon: faFileInvoice, label: "BILL OF LADING NUMBER", type: "text" },
    shipper: { icon: faUser, label: "SHIPPER", type: "text" },
    commodity: { icon: faBox, label: "COMMODITY", type: "text" }
  };

  return (
    <div className="mb-6 p-4 md:p-6 border border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-lg animate-fadeIn">
      <div className="flex items-center mb-4 pb-3 border-b border-blue-200">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <FontAwesomeIcon icon={faClipboardList} className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-blue-900">
            Add Logsheet for Trip #{tripData.id}
          </h3>
          <p className="text-blue-700 text-xs">Complete driver's daily log information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-5">
        {Object.keys(newLogsheetData).map((key) => (
          <div key={key} className="col-span-1 transform transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide flex items-center">
              <FontAwesomeIcon icon={fieldConfig[key]?.icon || faFileInvoice} className="mr-2 text-amber-600 text-xs" />
              {fieldConfig[key]?.label || key.replace(/_/g, " ").toUpperCase()}
            </label>
            <div className="relative">
              <input
                type={fieldConfig[key]?.type || "text"}
                name={key}
                value={newLogsheetData[key]}
                onChange={handleLogsheetChange}
                className="p-3 text-sm border border-blue-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white shadow-sm focus:shadow-md"
                min={fieldConfig[key]?.type === "number" ? "0" : undefined}
                step={fieldConfig[key]?.type === "number" ? "0.1" : undefined}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={submitLogsheet} 
          disabled={isLoading}
          className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-blue-900 disabled:from-blue-300 disabled:to-blue-400 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none group w-full md:w-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent -skew-x-12 animate-shimmer group-hover:animate-shimmerFast"></div>
          
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white mr-2" />
              <span className="font-medium text-sm md:text-base">Adding Logsheet...</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2 text-amber-300" />
              <span className="font-medium text-sm md:text-base">Add Logsheet</span>
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-shimmerFast {
          animation: shimmer 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default LogsheetForm;