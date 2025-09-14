import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTruck, 
  faSpinner, 
  faRoute, 
  faMapMarkerAlt, 
  faIdCard, 
  faCalendar,
  faCertificate,
  faShieldAlt,
  faUser,
  faRoad
} from '@fortawesome/free-solid-svg-icons';

const TripForm = ({ activeTab, formData, handleTripChange, submitTrip, isLoading }) => {
  if (activeTab !== "trip") return null;

  const fieldConfig = {
    carrier_name: { icon: faUser, label: "CARRIER NAME", placeholder: "Enter carrier company name" },
    pickup_location: { icon: faMapMarkerAlt, label: "PICKUP LOCATION", placeholder: "Enter pickup address" },
    dropoff_location: { icon: faMapMarkerAlt, label: "DROPOFF LOCATION", placeholder: "Enter destination address" },
    current_location: { icon: faMapMarkerAlt, label: "CURRENT LOCATION", placeholder: "Enter current location" },
    tractor_number: { icon: faTruck, label: "TRACTOR NUMBER", placeholder: "e.g., TRK-1234" },
    trailer_number: { icon: faTruck, label: "TRAILER NUMBER", placeholder: "e.g., TRL-5678" },
    license_plate: { icon: faCertificate, label: "LICENSE PLATE", placeholder: "Enter license plate number" },
    current_cycle_used: { icon: faRoad, label: "CYCLE USED (HOURS)", placeholder: "e.g., 8.5" }
  };

  return (
    <div className="mb-6 p-4 md:p-6 border border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-lg animate-fadeInGold">
      <div className="flex items-center mb-4 pb-3 border-b border-blue-200 relative">
        <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <FontAwesomeIcon icon={faTruck} className="text-white text-lg" />
        </div>
        <div>
          <h3 className="text-lg md:text-2xl font-bold text-blue-900">
            Trip & Truck Information
          </h3>
          <p className="text-blue-700 text-xs md:text-sm">Complete all fields to create a new trip</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mb-5">
        {Object.keys(formData).map((key) => (
          <div key={key} className="col-span-1 transform transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide flex items-center">
              <FontAwesomeIcon 
                icon={fieldConfig[key]?.icon || faCertificate} 
                className="mr-2 text-amber-600 text-xs" 
              />
              {fieldConfig[key]?.label || key.replace(/_/g, " ").toUpperCase()}
            </label>
            <div className="relative">
              <input
                name={key}
                value={formData[key]}
                onChange={handleTripChange}
                placeholder={fieldConfig[key]?.placeholder || `Enter ${key.replace(/_/g, " ")}`}
                className="p-3 text-sm border border-blue-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white shadow-sm focus:shadow-md"
              />
              <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300 border-2 border-amber-500"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 p-3 md:p-4 bg-blue-100/50 rounded-lg border border-blue-200">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mr-2">
            <FontAwesomeIcon icon={faShieldAlt} className="text-white text-xs" />
          </div>
          <h4 className="font-semibold text-blue-800 text-sm md:text-base">Important Notes</h4>
        </div>
        <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
          <li>Ensure all vehicle information is accurate and up-to-date</li>
          <li>Double-check locations for correct spelling and accuracy</li>
          <li>Cycle hours should reflect current usage at trip start</li>
        </ul>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={submitTrip} 
          disabled={isLoading}
          className="relative w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-900 disabled:from-blue-300 disabled:to-blue-400 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent -skew-x-12 animate-shimmer group-hover:animate-shimmerFast"></div>
          
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white mr-2" />
              <span className="font-medium text-sm md:text-base">Creating Trip...</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faRoute} className="mr-2 text-amber-300" />
              <span className="font-medium text-sm md:text-base">Create New Trip</span>
              <span className="ml-2 hidden md:inline-block bg-amber-500 text-white text-xs py-0.5 px-2 rounded-full">
                GO
              </span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes fadeInGold {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInGold {
          animation: fadeInGold 0.5s ease-out;
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
        
        /* Mobile-specific adjustments */
        @media (max-width: 768px) {
          .grid-cols-1 > div {
            margin-bottom: 0.75rem;
          }
          
          input {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }
      `}</style>
    </div>
  );
};

export default TripForm;