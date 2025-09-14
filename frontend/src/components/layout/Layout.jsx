import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaRoute, 
  FaPlusCircle, 
  FaBars,
  FaTimes,
  FaTruck,
  FaUserTie,
  FaHome,
  FaArrowLeft
} from "react-icons/fa";

export default function Layout({ children, role }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-4 flex justify-between items-center md:hidden shadow-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm">
            <FaTruck className="text-white text-sm" />
          </div>
          <h1 className="text-xl font-bold">TruckLog</h1>
        </div>
        <button 
          onClick={toggleSidebar}
          className="text-white focus:outline-none p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          w-64 bg-gradient-to-b from-blue-800 to-indigo-900 text-white p-5 flex flex-col fixed md:relative 
          inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
          md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-xl border-r border-blue-700/50
        `}
      >
        {/* Logo Section with Back Button */}
        <div className="flex items-center justify-between mb-10 pt-2">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm hover:bg-white/30 transition-colors"
              title="Go back to Home"
            >
              <FaArrowLeft className="text-white text-lg" />
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              TruckLog
            </h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-white md:hidden p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* User Role Badge */}
        <div className={`mb-8 px-4 py-3 rounded-xl flex items-center backdrop-blur-sm ${
          role === "manager" 
            ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/30" 
            : "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30"
        }`}>
          {role === "manager" ? (
            <>
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-3 border border-amber-400/30">
                <FaUserTie className="text-amber-300" />
              </div>
              <div>
                <p className="font-semibold text-amber-100">Manager Account</p>
                <p className="text-xs text-amber-200/80">Full Access</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 border border-blue-400/30">
                <FaTruck className="text-blue-300" />
              </div>
              <div>
                <p className="font-semibold text-blue-100">Driver Account</p>
                <p className="text-xs text-blue-200/80">Limited Access</p>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {role === "manager" && (
            <>
              <Link 
                to="/manager" 
                className={`flex items-center p-3.5 rounded-xl transition-all duration-200 group border ${
                  location.pathname === '/manager' 
                    ? 'bg-white/15 border-white/20 shadow-lg' 
                    : 'border-transparent hover:border-white/10 hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                  location.pathname === '/manager' 
                    ? 'bg-white/20' 
                    : 'bg-white/10 group-hover:bg-white/20'
                } transition-colors`}>
                  <FaTachometerAlt className="text-white text-sm" />
                </div>
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link 
                to="/manager/trips" 
                className={`flex items-center p-3.5 rounded-xl transition-all duration-200 group border ${
                  location.pathname === '/manager/trips' 
                    ? 'bg-white/15 border-white/20 shadow-lg' 
                    : 'border-transparent hover:border-white/10 hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                  location.pathname === '/manager/trips' 
                    ? 'bg-white/20' 
                    : 'bg-white/10 group-hover:bg-white/20'
                } transition-colors`}>
                  <FaRoute className="text-white text-sm" />
                </div>
                <span className="font-medium">Trips</span>
              </Link>
            </>
          )}

          {role === "driver" && (
            <>
              <Link
                to="/driver/trips/create"
                className={`flex items-center p-3.5 rounded-xl transition-all duration-200 group border ${
                  location.pathname === '/driver/trips/create' 
                    ? 'bg-white/15 border-white/20 shadow-lg' 
                    : 'border-transparent hover:border-white/10 hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                  location.pathname === '/driver/trips/create' 
                    ? 'bg-white/20' 
                    : 'bg-white/10 group-hover:bg-white/20'
                } transition-colors`}>
                  <FaPlusCircle className="text-white text-sm" />
                </div>
                <span className="font-medium">Create Trip</span>
              </Link>
            </>
          )}
        </nav>

        {/* Footer Section */}
        <div className="pt-5 mt-auto border-t border-blue-700/50">
          <div className="text-center text-blue-200/70 text-xs">
            <p className="font-semibold">TruckLog v1.0</p>
            <p className="mt-1">Premium Logistics Solution</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto md:ml-0 bg-gray-50">
        {children}
      </div>
    </div>
  );
}