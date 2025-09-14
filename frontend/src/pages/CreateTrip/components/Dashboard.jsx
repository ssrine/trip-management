import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faTruck, 
  faRoute, 
  faFileAlt,
  faClock,
  faCalendar,
  faList,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ activeTab, tripData, logsheetsData, entriesData }) => {
  if (!tripData || activeTab !== "dashboard") return null;
  
  const totals = logsheetsData.reduce((acc, logsheet) => ({
    driving: acc.driving + (logsheet.driving_hours || 0),
    onDuty: acc.onDuty + (logsheet.on_duty_hours || 0),
    offDuty: acc.offDuty + (logsheet.off_duty_hours || 0),
    sleeper: acc.sleeper + (logsheet.sleeper_hours || 0)
  }), { driving: 0, onDuty: 0, offDuty: 0, sleeper: 0 });

  return (
    <div className="mt-6 p-4 md:p-6 border border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-lg animate-fadeIn">
      {/* Header */}
      <div className="flex items-center mb-5 pb-3 border-b border-blue-200">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <FontAwesomeIcon icon={faTachometerAlt} className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-blue-900">
            Trip Dashboard
          </h3>
          <p className="text-blue-700 text-xs">Comprehensive overview of trip #{tripData.id}</p>
        </div>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-5">
        <div className="bg-white p-3 rounded-lg shadow border border-blue-100 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <FontAwesomeIcon icon={faFileAlt} className="text-blue-600 text-sm" />
            </div>
            <span className="text-xs font-semibold text-blue-800">Logsheets</span>
          </div>
          <p className="text-xl font-bold text-blue-900">{logsheetsData.length}</p>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow border border-blue-100 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
              <FontAwesomeIcon icon={faList} className="text-green-600 text-sm" />
            </div>
            <span className="text-xs font-semibold text-blue-800">Entries</span>
          </div>
          <p className="text-xl font-bold text-blue-900">{entriesData.length}</p>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow border border-blue-100 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-2">
              <FontAwesomeIcon icon={faClock} className="text-amber-600 text-sm" />
            </div>
            <span className="text-xs font-semibold text-blue-800">Driving Hours</span>
          </div>
          <p className="text-xl font-bold text-blue-900">{totals.driving.toFixed(1)}h</p>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow border border-blue-100 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
              <FontAwesomeIcon icon={faChartLine} className="text-purple-600 text-sm" />
            </div>
            <span className="text-xs font-semibold text-blue-800">Total Hours</span>
          </div>
          <p className="text-xl font-bold text-blue-900">{(totals.driving + totals.onDuty + totals.offDuty + totals.sleeper).toFixed(1)}h</p>
        </div>
      </div>
      
      {/* Trip Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-5">
        <div className="bg-white p-4 rounded-lg shadow border border-blue-100 transition-all duration-300 hover:shadow-lg">
          <h4 className="font-bold mb-3 text-blue-800 flex items-center text-sm md:text-base">
            <FontAwesomeIcon icon={faTruck} className="mr-2 text-amber-600" />
            Vehicle Information
          </h4>
          <div className="space-y-2">
            <p className="text-xs md:text-sm"><span className="font-semibold text-blue-700">Trip ID:</span> {tripData.id}</p>
            <p className="text-xs md:text-sm"><span className="font-semibold text-blue-700">Carrier:</span> {tripData.carrier_name}</p>
            <p className="text-xs md:text-sm"><span className="font-semibold text-blue-700">Tractor:</span> {tripData.tractor_number}</p>
            <p className="text-xs md:text-sm"><span className="font-semibold text-blue-700">Trailer:</span> {tripData.trailer_number}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-blue-100 transition-all duration-300 hover:shadow-lg">
          <h4 className="font-bold mb-3 text-blue-800 flex items-center text-sm md:text-base">
            <FontAwesomeIcon icon={faRoute} className="mr-2 text-amber-600" />
            Route Information
          </h4>
          <div className="space-y-2">
            <p className="text-xs md:text-sm"><span className="font-semibold text-blue-700">Current:</span> {tripData.current_location}</p>
            <p className="text-xs md:text-sm"><span className="font-semibold text-blue-700">Pickup:</span> {tripData.pickup_location}</p>
            <p className="text-xs md:text-sm"><span className="font-semibold text-blue-700">Dropoff:</span> {tripData.dropoff_location}</p>
          </div>
        </div>
      </div>
      
      {/* Logsheets Summary */}
      <div className="mb-5">
        <h4 className="font-bold mb-3 text-blue-800 flex items-center text-sm md:text-base">
          <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-amber-600" />
          Logsheets Summary
        </h4>
        {logsheetsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {logsheetsData.map((logsheet) => (
              <div key={logsheet.id} className="bg-white p-3 rounded-lg shadow border border-blue-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                    #{logsheet.id}
                  </span>
                  <span className="text-xs text-blue-600">
                    <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                    {new Date(logsheet.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="font-semibold text-blue-800">{logsheet.driving_hours || 0}h</p>
                    <p className="text-blue-600">Driving</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="font-semibold text-green-800">{logsheet.on_duty_hours || 0}h</p>
                    <p className="text-green-600">On Duty</p>
                  </div>
                </div>
                {logsheet.bol_number && (
                  <p className="text-xs text-blue-700 mt-2 truncate">
                    BOL: {logsheet.bol_number}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-xs md:text-sm bg-blue-50 p-3 rounded-lg text-center">No logsheets added yet.</p>
        )}
      </div>
      
      {/* Recent Entries */}
      <div>
        <h4 className="font-bold mb-3 text-blue-800 flex items-center text-sm md:text-base">
          <FontAwesomeIcon icon={faList} className="mr-2 text-amber-600" />
          Recent Activity Entries
        </h4>
        {entriesData.length > 0 ? (
          <div className="bg-white rounded-lg shadow border border-blue-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-2 md:p-3 text-left text-blue-800 font-semibold">Status</th>
                    <th className="p-2 md:p-3 text-left text-blue-800 font-semibold hidden md:table-cell">Start Time</th>
                    <th className="p-2 md:p-3 text-left text-blue-800 font-semibold hidden md:table-cell">End Time</th>
                    <th className="p-2 md:p-3 text-left text-blue-800 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {entriesData.slice(-5).map((entry, index) => (
                    <tr key={entry.id} className={`border-t border-blue-100 transition-colors duration-200 hover:bg-blue-50 ${index % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'}`}>
                      <td className="p-2 md:p-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          entry.status === 'Driving' ? 'bg-blue-100 text-blue-800' :
                          entry.status === 'On Duty' ? 'bg-green-100 text-green-800' :
                          entry.status === 'Off Duty' ? 'bg-gray-100 text-gray-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="p-2 md:p-3 text-blue-700 hidden md:table-cell">
                        {new Date(entry.start_time).toLocaleString()}
                      </td>
                      <td className="p-2 md:p-3 text-blue-700 hidden md:table-cell">
                        {new Date(entry.end_time).toLocaleString()}
                      </td>
                      <td className="p-2 md:p-3 text-blue-700 max-w-xs truncate">
                        {entry.note || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-xs md:text-sm bg-blue-50 p-3 rounded-lg text-center">No entries added yet.</p>
        )}
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;