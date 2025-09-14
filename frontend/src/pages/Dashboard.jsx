import React, { useEffect, useState } from "react";
import { getTrips } from "../services/tripService";
import { 
  FaEye, 
  FaTruck, 
  FaRoute, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUserTie,
  FaChartLine,
  FaCog,
  FaBell,
  FaSearch,
  FaFilter,
  FaSort
} from "react-icons/fa";
import managerBg from "../assets/mangerdetails.jpg";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch trips from backend
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getTrips();
        setTrips(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching trips:", err);
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  // Calculate stats
  const totalTrips = trips.length;
  const totalLogsheets = trips.reduce(
    (acc, trip) => acc + (trip.logsheets ? trip.logsheets.length : 0),
    0
  );
  const totalHours = trips.reduce(
    (acc, trip) =>
      acc +
      (trip.logsheets ? trip.logsheets.reduce(
        (logAcc, log) => logAcc + (log.driving_hours || 0),
        0
      ) : 0),
    0
  );

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort trips
  const sortedTrips = React.useMemo(() => {
    let sortableItems = [...trips];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [trips, sortConfig]);

  // Filter trips based on search and active tab
  const filteredTrips = sortedTrips.filter(trip => {
    const matchesSearch = 
      (trip.pickup_location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.dropoff_location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.carrier_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && trip.status === "active";
    if (activeTab === "completed") return matchesSearch && trip.status === "completed";
    return matchesSearch;
  });

  // Get current trips for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format table header with sort indicator
  const renderSortableHeader = (key, label) => {
    return (
      <th 
        scope="col" 
        className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => handleSort(key)}
      >
        <div className="flex items-center">
          {label}
          <FaSort className={`ml-1 text-xs ${sortConfig.key === key ? 'text-blue-600' : 'text-gray-400'}`} />
          {sortConfig.key === key && (
            <span>
              {sortConfig.direction === 'ascending' ? '↑' : '↓'}
            </span>
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with Image */}
      <div 
        className="relative h-48 md:h-64 bg-blue-900 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 35, 64, 0.85), rgba(8, 27, 51, 0.9)), url(${managerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Animated elements */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-amber-400/10 opacity-15 animate-float"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + i * 5}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">Manager Dashboard</h1>
          <p className="text-blue-100 max-w-2xl mx-auto mb-4 md:mb-6 text-sm md:text-base">
            Monitor and manage all fleet operations with real-time analytics and advanced reporting tools
          </p>
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            <div className="flex items-center bg-blue-700/50 backdrop-blur-sm text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm">
              <FaUserTie className="mr-1 md:mr-2 text-amber-400" />
              <span>Admin User</span>
            </div>
            <div className="flex items-center bg-blue-700/50 backdrop-blur-sm text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm">
              <FaChartLine className="mr-1 md:mr-2 text-amber-400" />
              <span>Performance Analytics</span>
            </div>
          </div>
        </div>

        {/* Decorative gold bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 md:py-8 -mt-12 md:-mt-16 relative z-20">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 md:w-24 md:h-24 bg-amber-500/10 rounded-full"></div>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Total Trips</h2>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <FaRoute className="text-blue-600 text-lg md:text-xl" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{totalTrips}</p>
            <div className="mt-2 h-2 bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, (totalTrips / 20) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 md:w-24 md:h-24 bg-amber-500/10 rounded-full"></div>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Total Logsheets</h2>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <FaChartLine className="text-amber-600 text-lg md:text-xl" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{totalLogsheets}</p>
            <div className="mt-2 h-2 bg-amber-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-700 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, (totalLogsheets / 50) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 md:w-24 md:h-24 bg-amber-500/10 rounded-full"></div>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Total Hours</h2>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <FaClock className="text-blue-600 text-lg md:text-xl" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{totalHours.toFixed(1)}</p>
            <div className="mt-2 h-2 bg-blue-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, (totalHours / 100) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 overflow-hidden mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Trip Management</h2>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search trips..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center border border-gray-300 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50 text-sm md:text-base">
                  <FaFilter className="mr-1 md:mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4 md:mb-6">
            <nav className="flex -mb-px overflow-x-auto">
              {["all", "active", "completed"].map(tab => (
                <button
                  key={tab}
                  className={`flex-shrink-0 mr-4 md:mr-8 py-2 md:py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Trips
                  <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                    {tab === "all" ? trips.length : 
                     tab === "active" ? trips.filter(t => t.status === "active").length : 
                     trips.filter(t => t.status === "completed").length}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8 md:py-12">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <FaTruck className="text-3xl md:text-4xl text-gray-400 mx-auto mb-3 md:mb-4" />
              <p className="text-gray-600 text-sm md:text-base">No trips found</p>
              <button className="mt-3 md:mt-4 bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                Create New Trip
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {renderSortableHeader("id", "Trip ID")}
                      {renderSortableHeader("pickup_location", "Route")}
                      {renderSortableHeader("carrier_name", "Carrier")}
                      {renderSortableHeader("current_location", "Location")}
                      <th scope="col" className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Logsheets
                      </th>
                      {renderSortableHeader("status", "Status")}
                      <th scope="col" className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentTrips.map((trip) => (
                      <tr key={trip.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{trip.id}</div>
                        </td>
                        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-red-500 mr-1 md:mr-2 flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] md:max-w-none">{trip.pickup_location} → {trip.dropoff_location}</div>
                              <div className="text-xs text-gray-500">Est. 4h 30m</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaTruck className="text-blue-500 mr-1 md:mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-900 truncate max-w-[80px] md:max-w-none">{trip.carrier_name}</span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900 truncate max-w-[100px] md:max-w-none">{trip.current_location}</div>
                          <div className="text-xs text-gray-500">Updated 2h ago</div>
                        </td>
                        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {trip.logsheets ? trip.logsheets.length : 0} docs
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            trip.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {trip.status || 'completed'}
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => (window.location = `/manager/trips/${trip.id}`)}
                            className="flex items-center bg-blue-600 text-white px-2 py-1.5 md:px-3 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm"
                            title="View Details"
                          >
                            <FaEye className="mr-1" />
                            <span className="hidden sm:inline">View Details</span>
                            <span className="sm:hidden">View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-6 px-2 sm:px-4">
                <div className="text-xs md:text-sm text-gray-700 mb-3 md:mb-0">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {indexOfLastItem > filteredTrips.length ? filteredTrips.length : indexOfLastItem}
                  </span> of{' '}
                  <span className="font-medium">{filteredTrips.length}</span> results
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="px-2 py-1 md:px-3 md:py-1.5 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-2 py-1 md:px-3 md:py-1.5 border rounded-md text-xs md:text-sm font-medium ${
                        currentPage === number
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 md:px-3 md:py-1.5 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add custom animations to tailwind config */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
          .animate-float {
            animation: float 8s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}