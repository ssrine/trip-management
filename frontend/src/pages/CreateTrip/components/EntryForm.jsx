import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileAlt, 
  faSpinner, 
  faPlusCircle,
  faList,
  faStickyNote,
  faPlay,
  faStop,
  faClock
} from '@fortawesome/free-solid-svg-icons';

const EntryForm = ({ activeTab, logsheetsData, newEntryData, handleEntryChange, setNewEntryData, submitEntry, isLoading }) => {
  if (activeTab !== "entries" || logsheetsData.length === 0) return null;

  return (
    <div className="mb-6 p-4 md:p-6 border border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-lg animate-fadeIn">
      {/* Header with gold accent */}
      <div className="flex items-center mb-4 pb-3 border-b border-blue-200">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <FontAwesomeIcon icon={faFileAlt} className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-blue-900">
            Add Activity Entry
          </h3>
          <p className="text-blue-700 text-xs">Record driver status changes</p>
        </div>
      </div>
      
      {/* Logsheet Selection */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide flex items-center">
          <FontAwesomeIcon icon={faList} className="mr-2 text-amber-600 text-xs" />
          SELECT LOGSHEET
        </label>
        <div className="relative">
          <select 
            className="p-3 text-sm border border-blue-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white shadow-sm focus:shadow-md"
            onChange={(e) => setNewEntryData({...newEntryData, logsheet: e.target.value})}
            value={newEntryData.logsheet}
          >
            <option value="">Select a logsheet</option>
            {logsheetsData.map((logsheet) => (
              <option key={logsheet.id} value={logsheet.id}>
                Logsheet #{logsheet.id} - {new Date(logsheet.date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-5">
        <div className="col-span-1 transform transition-all duration-300 hover:scale-[1.02]">
          <label className="block text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide flex items-center">
            <FontAwesomeIcon icon={faPlay} className="mr-2 text-amber-600 text-xs" />
            STATUS
          </label>
          <div className="relative">
            <select 
              name="status" 
              value={newEntryData.status} 
              onChange={handleEntryChange} 
              className="p-3 text-sm border border-blue-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white shadow-sm focus:shadow-md"
            >
              <option value="Driving">Driving</option>
              <option value="Off Duty">Off Duty</option>
              <option value="On Duty">On Duty</option>
              <option value="Sleeper">Sleeper</option>
            </select>
          </div>
        </div>
        
        <div className="col-span-1 transform transition-all duration-300 hover:scale-[1.02]">
          <label className="block text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide flex items-center">
            <FontAwesomeIcon icon={faStickyNote} className="mr-2 text-amber-600 text-xs" />
            NOTE
          </label>
          <div className="relative">
            <input 
              name="note" 
              value={newEntryData.note} 
              onChange={handleEntryChange} 
              placeholder="Activity notes or comments" 
              className="p-3 text-sm border border-blue-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white shadow-sm focus:shadow-md"
            />
          </div>
        </div>
        
        <div className="col-span-1 transform transition-all duration-300 hover:scale-[1.02]">
          <label className="block text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-amber-600 text-xs" />
            START TIME
          </label>
          <div className="relative">
            <input 
              type="datetime-local" 
              name="start_time" 
              value={newEntryData.start_time} 
              onChange={handleEntryChange} 
              className="p-3 text-sm border border-blue-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white shadow-sm focus:shadow-md"
            />
          </div>
        </div>
        
        <div className="col-span-1 transform transition-all duration-300 hover:scale-[1.02]">
          <label className="block text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-2 text-amber-600 text-xs" />
            END TIME
          </label>
          <div className="relative">
            <input 
              type="datetime-local" 
              name="end_time" 
              value={newEntryData.end_time} 
              onChange={handleEntryChange} 
              className="p-3 text-sm border border-blue-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white shadow-sm focus:shadow-md"
            />
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center">
        <button 
          onClick={() => submitEntry(newEntryData.logsheet)} 
          disabled={isLoading || !newEntryData.logsheet}
          className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-blue-900 disabled:from-blue-300 disabled:to-blue-400 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none group w-full md:w-auto"
        >
          {/* Gold shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent -skew-x-12 animate-shimmer group-hover:animate-shimmerFast"></div>
          
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white mr-2" />
              <span className="font-medium text-sm md:text-base">Adding Entry...</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2 text-amber-300" />
              <span className="font-medium text-sm md:text-base">Add Entry</span>
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

export default EntryForm;