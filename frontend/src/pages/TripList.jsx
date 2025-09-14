import React, { useEffect, useState } from "react";
import { getTrips } from "../services/tripService";
import { Link } from "react-router-dom";
import { FaEye, FaTruck, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Call backend to get all trips
    getTrips()
      .then((res) => {
        setTrips(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trips:", err);
        setLoading(false);
      });
  }, []);

  // Filter trips based on search
  const filteredTrips = trips.filter(trip => {
    return (
      (trip.pickup_location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.dropoff_location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.carrier_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.current_location || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">All Trips</h2>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search trips..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredTrips.length === 0 ? (
            <div className="text-center py-12">
              <FaTruck className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No trips found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrier</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTrips.map((trip) => (
                    <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{trip.id}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-red-500 mr-2 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{trip.pickup_location} → {trip.dropoff_location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaTruck className="text-blue-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-900">{trip.carrier_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{trip.current_location}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Link
                          to={`/manager/trips/${trip.id}`}
                          className="inline-flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <FaEye className="mr-1" />
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}