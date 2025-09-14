import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTripById, downloadTripPdf } from "../services/tripService";
import { getLogsheetById } from "../services/logsheetService";
import { 
  FaDownload, 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaTruck, 
  FaClock, 
  FaFileAlt, 
  FaRoad,
  FaIdCard,
  FaCalendar,
  FaListAlt,
  FaRoute,
  FaShippingFast,
  FaBars,
  FaEllipsisV
} from "react-icons/fa";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchTripData() {
      try {
        const tripRes = await getTripById(id);
        const tripData = tripRes.data;

        const logsheetsWithEntries = await Promise.all(
          tripData.logsheets.map(async (log) => {
            const logRes = await getLogsheetById(log.id);
            return logRes.data; 
          })
        );

        tripData.logsheets = logsheetsWithEntries;
        setTrip(tripData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trip data:", err);
        setLoading(false);
      }
    }

    fetchTripData();
  }, [id]);

  const handleDownloadPdf = async () => {
    try {
      const res = await downloadTripPdf(id);
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Trip_${id}_Report.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error downloading PDF:", err);
    }
  };

  const calculateTotals = () => {
    if (!trip || !trip.logsheets) return {};
    
    return trip.logsheets.reduce((totals, log) => ({
      driving: totals.driving + (log.driving_hours || 0),
      onDuty: totals.onDuty + (log.on_duty_hours || 0),
      offDuty: totals.offDuty + (log.off_duty_hours || 0),
      sleeper: totals.sleeper + (log.sleeper_hours || 0),
      totalEntries: totals.totalEntries + (log.entries ? log.entries.length : 0)
    }), { driving: 0, onDuty: 0, offDuty: 0, sleeper: 0, totalEntries: 0 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTruck className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Trip Not Found</h2>
          <p className="text-gray-600 mb-4">The requested trip could not be loaded or doesn't exist.</p>
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center justify-center mx-auto bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="md:hidden bg-gradient-to-r from-blue-800 to-indigo-900 rounded-xl p-4 text-white mb-4 flex justify-between items-center">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-white"
          >
            <FaArrowLeft className="mr-2" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-lg font-bold">Trip #{trip.id}</h1>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1"
          >
            <FaEllipsisV />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg p-3 absolute right-4 z-10 w-48">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center w-full text-left p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FaDownload className="mr-2 text-amber-600" />
              Download PDF
            </button>
          </div>
        )}

        <div className="mb-6 md:mb-8">
          <button 
            onClick={() => window.history.back()} 
            className="hidden md:flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-2 shadow-sm group-hover:shadow-md transition-shadow">
              <FaArrowLeft className="text-blue-600" />
            </div>
            <span className="font-medium">Back to Dashboard</span>
          </button>

          <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 text-white relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 md:w-16 md:h-16 bg-amber-400/20 rounded-full"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-3xl font-bold mb-2">Trip #{trip.id} Details</h2>
                <p className="text-blue-100 flex items-center text-sm md:text-base">
                  <FaRoute className="mr-2 hidden sm:inline" /> 
                  <span className="truncate">{trip.pickup_location} → {trip.dropoff_location}</span>
                </p>
              </div>
              <button
                onClick={handleDownloadPdf}
                className="hidden md:flex items-center bg-white text-blue-800 px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl font-medium whitespace-nowrap"
              >
                <FaDownload className="mr-2" /> Download Full Report
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">
          <div className="bg-white rounded-lg md:rounded-xl shadow p-3 md:p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <h3 className="text-xs md:text-sm font-medium text-gray-500">Total Hours</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaClock className="text-blue-600 text-sm md:text-base" />
              </div>
            </div>
            <p className="text-lg md:text-2xl font-bold text-gray-800">{totals.driving + totals.onDuty + totals.offDuty + totals.sleeper}h</p>
          </div>
          
          <div className="bg-white rounded-lg md:rounded-xl shadow p-3 md:p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <h3 className="text-xs md:text-sm font-medium text-gray-500">Logsheets</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-amber-600 text-sm md:text-base" />
              </div>
            </div>
            <p className="text-lg md:text-2xl font-bold text-gray-800">{trip.logsheets.length}</p>
          </div>
          
          <div className="bg-white rounded-lg md:rounded-xl shadow p-3 md:p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <h3 className="text-xs md:text-sm font-medium text-gray-500">Entries</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FaListAlt className="text-green-600 text-sm md:text-base" />
              </div>
            </div>
            <p className="text-lg md:text-2xl font-bold text-gray-800">{totals.totalEntries}</p>
          </div>
          
          <div className="bg-white rounded-lg md:rounded-xl shadow p-3 md:p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <h3 className="text-xs md:text-sm font-medium text-gray-500">Driving Hours</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaRoad className="text-purple-600 text-sm md:text-base" />
              </div>
            </div>
            <p className="text-lg md:text-2xl font-bold text-gray-800">{totals.driving}h</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100">
            <h3 className="font-semibold text-lg md:text-xl mb-4 text-gray-800 flex items-center pb-3 border-b border-gray-200">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <FaTruck className="text-blue-600 text-sm md:text-base" />
              </div>
              Trip Information
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1">
                  <FaIdCard className="text-gray-600 text-xs md:text-sm" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Carrier</p>
                  <p className="font-medium text-gray-900 text-sm md:text-base">{trip.carrier_name || "Not specified"}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1">
                  <FaMapMarkerAlt className="text-red-500 text-xs md:text-sm" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Current Location</p>
                  <p className="font-medium text-gray-900 text-sm md:text-base">{trip.current_location || "In transit"}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1">
                  <FaClock className="text-amber-500 text-xs md:text-sm" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Cycle Used</p>
                  <p className="font-medium text-gray-900 text-sm md:text-base">{trip.current_cycle_used || 0} hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1">
                  <FaShippingFast className="text-indigo-500 text-xs md:text-sm" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Vehicle Information</p>
                  <p className="font-medium text-gray-900 text-sm md:text-base">Tractor: {trip.tractor_number || "N/A"}</p>
                  <p className="text-xs md:text-sm text-gray-600">Trailer: {trip.trailer_number || "N/A"}</p>
                  <p className="text-xs md:text-sm text-gray-600">License: {trip.license_plate || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100">
            <h3 className="font-semibold text-lg md:text-xl mb-4 text-gray-800 flex items-center pb-3 border-b border-gray-200">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <FaRoute className="text-green-600 text-sm md:text-base" />
              </div>
              Route Details
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-lg flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1">
                  <FaMapMarkerAlt className="text-red-500 text-xs md:text-sm" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Pickup Location</p>
                  <p className="font-medium text-gray-900 text-sm md:text-base">{trip.pickup_location || "Not specified"}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1">
                  <FaMapMarkerAlt className="text-green-500 text-xs md:text-sm" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Dropoff Location</p>
                  <p className="font-medium text-gray-900 text-sm md:text-base">{trip.dropoff_location || "Not specified"}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2 md:mr-3 mt-0.5 md:mt-1">
                  <FaCalendar className="text-blue-500 text-xs md:text-sm" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Trip Duration</p>
                  <p className="font-medium text-gray-900 text-sm md:text-base">Est. 2-3 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100 mt-6 md:mt-8">
          <h3 className="font-semibold text-lg md:text-xl mb-4 md:mb-6 text-gray-800 flex items-center pb-3 border-b border-gray-200">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
              <FaFileAlt className="text-amber-600 text-sm md:text-base" />
            </div>
            Logsheets & Activity Log
          </h3>

          {trip.logsheets.length === 0 ? (
            <div className="text-center py-6 md:py-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFileAlt className="text-gray-400 text-lg md:text-xl" />
              </div>
              <p className="text-gray-500 text-sm md:text-base">No logsheets available for this trip.</p>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              {trip.logsheets.map((log) => (
                <div key={log.id} className="border border-gray-200 rounded-lg md:rounded-xl p-4 md:p-5 bg-gray-50/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4 pb-2 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-800 flex items-center text-sm md:text-base">
                      <FaCalendar className="text-blue-500 mr-2" /> Logsheet: {log.date}
                    </h4>
                    <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-0">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        Driving: {log.driving_hours || 0}h
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        On Duty: {log.on_duty_hours || 0}h
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                        Off Duty: {log.off_duty_hours || 0}h
                      </span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                        Sleeper: {log.sleeper_hours || 0}h
                      </span>
                    </div>
                  </div>

                  {log.entries && log.entries.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                            <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End</th>
                            <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {log.entries.map((entry) => (
                            <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  entry.status === 'Driving' ? 'bg-blue-100 text-blue-800' :
                                  entry.status === 'On Duty' ? 'bg-green-100 text-green-800' :
                                  entry.status === 'Off Duty' ? 'bg-gray-100 text-gray-800' :
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {entry.status}
                                </span>
                              </td>
                              <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-700">
                                {new Date(entry.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </td>
                              <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-700">
                                {new Date(entry.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </td>
                              <td className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-gray-700 max-w-xs truncate">{entry.location || "N/A"}</td>
                              <td className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-gray-700 max-w-xs truncate">{entry.note || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-3 md:py-4 text-sm md:text-base">No entries recorded for this logsheet.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:hidden fixed bottom-4 right-4 z-10">
          <button
            onClick={handleDownloadPdf}
            className="w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg flex items-center justify-center hover:from-amber-600 hover:to-amber-700 transition-colors"
            aria-label="Download PDF"
          >
            <FaDownload className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}