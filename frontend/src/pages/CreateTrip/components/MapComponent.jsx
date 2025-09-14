import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRoute, 
  faMapMarkerAlt, 
  faWarehouse, 
  faMapPin, 
  faRoad,
  faClock,
  faDollarSign,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';

const MapComponent = ({ activeTab, formData, updateMap, mapRef }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  useEffect(() => {
    if (activeTab === "trip") {
      updateMap(formData);
    }
  }, [formData.current_location, formData.pickup_location, formData.dropoff_location, activeTab]);

  if (activeTab !== "trip") return null;

  // Mock data for demonstration
  const routeDetails = {
    distance: "15.2 miles",
    duration: "32 minutes",
    estimatedCost: "$45.50"
  };

  return (
    <div className="mb-4 animate-fadeIn">
      <h3 className="text-lg font-bold mb-2 text-blue-700 flex items-center justify-between">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faRoute} className="mr-2 text-yellow-500" />
          Route Map
        </div>
        <button 
          className="md:hidden text-blue-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
        </button>
      </h3>
      
      <div id="map" style={{ height: "250px", width: "100%", borderRadius: "8px" }}></div>
      
      {/* Collapsible details for mobile */}
      <div className={`mt-3 ${isExpanded ? 'block' : 'hidden'} md:block`}>
        {/* Route summary bar - always visible on mobile */}
        <div className="flex justify-between bg-blue-50 p-2 rounded-lg mb-2 md:hidden">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faRoad} className="text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{routeDetails.distance}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{routeDetails.duration}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faDollarSign} className="text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{routeDetails.estimatedCost}</span>
          </div>
        </div>
        
        {/* Detailed information - collapsible on mobile */}
        <div className="bg-blue-50 p-3 rounded-lg border border-yellow-200 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
            <div className="bg-white p-2 rounded shadow-sm flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-2">
                <FontAwesomeIcon icon={faRoad} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Distance</p>
                <p className="font-semibold">{routeDetails.distance}</p>
              </div>
            </div>
            
            <div className="bg-white p-2 rounded shadow-sm flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-2">
                <FontAwesomeIcon icon={faClock} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-semibold">{routeDetails.duration}</p>
              </div>
            </div>
            
            <div className="bg-white p-2 rounded shadow-sm flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-2">
                <FontAwesomeIcon icon={faDollarSign} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Est. Cost</p>
                <p className="font-semibold">{routeDetails.estimatedCost}</p>
              </div>
            </div>
          </div>
          
          {/* Location legend */}
          <div className="flex flex-wrap justify-between mt-2 text-xs">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
              <span className="font-medium">Current</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span className="font-medium">Pickup</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span className="font-medium">Dropoff</span>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
              <span className="font-medium">Route</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Always visible minimal info on mobile when collapsed */}
      {!isExpanded && (
        <div className="md:hidden flex justify-between mt-2 bg-blue-50 p-2 rounded-lg">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faRoad} className="text-yellow-500 mr-1" />
            <span className="text-sm">{routeDetails.distance}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="text-yellow-500 mr-1" />
            <span className="text-sm">{routeDetails.duration}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;