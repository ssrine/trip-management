import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTruck, 
  faClipboardList, 
  faFileAlt, 
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';

const NavigationTabs = ({ activeTab, setActiveTab, tripData, logsheetsData }) => {
  return (
    <div className="flex flex-col md:flex-row border-b mb-4 overflow-x-auto">
      <button
        className={`py-2 px-3 md:px-4 font-medium transition-all duration-300 flex items-center ${activeTab === "trip" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500"}`}
        onClick={() => setActiveTab("trip")}
      >
        <FontAwesomeIcon icon={faTruck} className="mr-1 md:mr-2 text-sm md:text-base" />
        <span className="text-xs md:text-sm">Trip</span>
      </button>
      <button
        className={`py-2 px-3 md:px-4 font-medium transition-all duration-300 flex items-center ${activeTab === "logsheets" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"} ${!tripData ? "opacity-50 cursor-not-allowed" : "hover:text-blue-500"}`}
        onClick={() => tripData && setActiveTab("logsheets")}
        disabled={!tripData}
      >
        <FontAwesomeIcon icon={faClipboardList} className="mr-1 md:mr-2 text-sm md:text-base" />
        <span className="text-xs md:text-sm">Logsheets</span>
      </button>
      <button
        className={`py-2 px-3 md:px-4 font-medium transition-all duration-300 flex items-center ${activeTab === "entries" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"} ${logsheetsData.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-blue-500"}`}
        onClick={() => logsheetsData.length > 0 && setActiveTab("entries")}
        disabled={logsheetsData.length === 0}
      >
        <FontAwesomeIcon icon={faFileAlt} className="mr-1 md:mr-2 text-sm md:text-base" />
        <span className="text-xs md:text-sm">Entries</span>
      </button>
      <button
        className={`py-2 px-3 md:px-4 font-medium transition-all duration-300 flex items-center ${activeTab === "dashboard" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"} ${!tripData ? "opacity-50 cursor-not-allowed" : "hover:text-blue-500"}`}
        onClick={() => tripData && setActiveTab("dashboard")}
        disabled={!tripData}
      >
        <FontAwesomeIcon icon={faTachometerAlt} className="mr-1 md:mr-2 text-sm md:text-base" />
        <span className="text-xs md:text-sm">Dashboard</span>
      </button>
    </div>
  );
};

export default NavigationTabs;