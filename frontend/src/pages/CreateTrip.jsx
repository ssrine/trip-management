import React, { useState, useEffect, useRef } from "react";
import { createTrip } from "../services/tripService";
import { createLogsheet } from "../services/logsheetService";
import { createEntry } from "../services/entryService";
import L from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTruck, 
  faClipboardList, 
  faFileAlt, 
  faTachometerAlt,
  faExclamationTriangle,
  faCheckCircle,
  faSpinner,
  faMapMarkerAlt,
  faWarehouse,
  faMapPin,
  faRoute
} from '@fortawesome/free-solid-svg-icons';

// ---------------------
// UTILITY FUNCTIONS
// ---------------------
const clearMessagesAfterDelay = (setMessages, delay = 5000) => {
  const timer = setTimeout(() => {
    setMessages({ error: "", success: "" });
  }, delay);
  return () => clearTimeout(timer);
};

const getCoordinates = async (location) => {
  if (!location) return null;
  
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );
    const data = await res.json();
    if (data.length > 0) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

// ---------------------
// COMPONENT FUNCTIONS
// ---------------------
const CreateTrip = () => {
  const [tripData, setTripData] = useState(null);
  const [logsheetsData, setLogsheetsData] = useState([]);
  const [entriesData, setEntriesData] = useState([]);
  const [formData, setFormData] = useState({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    carrier_name: "",
    main_office_address: "",
    home_terminal_address: "",
    tractor_number: "",
    trailer_number: "",
    license_plate: "",
  });
  const [newLogsheetData, setNewLogsheetData] = useState({
    date: new Date().toISOString().slice(0, 10),
    driving_hours: 0,
    on_duty_hours: 0,
    off_duty_hours: 0,
    sleeper_hours: 0,
    hours_left_in_cycle: 0,
    bol_number: "",
    shipper: "",
    commodity: "",
  });
  const [newEntryData, setNewEntryData] = useState({
    note: "",
    status: "Driving",
    start_time: new Date().toISOString().slice(0, 16),
    end_time: new Date().toISOString().slice(0, 16),
  });
  const [messages, setMessages] = useState({ error: "", success: "" });
  const [activeTab, setActiveTab] = useState("trip");
  const [isLoading, setIsLoading] = useState(false);

  const mapRef = useRef(null);

  // ---------------------
  // EFFECT HOOKS
  // ---------------------
  useEffect(() => {
    if (messages.error || messages.success) {
      return clearMessagesAfterDelay(setMessages);
    }
  }, [messages]);

  useEffect(() => {
    initializeMap();
    
    return () => {
      cleanupMap();
    };
  }, []);

  useEffect(() => {
    updateMap();
  }, [formData.current_location, formData.pickup_location, formData.dropoff_location]);

  // ---------------------
  // MAP FUNCTIONS
  // ---------------------
  const initializeMap = () => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([39.8283, -98.5795], 4);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }
  };

  const cleanupMap = () => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  };

  const updateMap = async () => {
    if (!formData.current_location && !formData.pickup_location && !formData.dropoff_location) return;

    try {
      const currentCoords = formData.current_location ? await getCoordinates(formData.current_location) : null;
      const pickupCoords = formData.pickup_location ? await getCoordinates(formData.pickup_location) : null;
      const dropoffCoords = formData.dropoff_location ? await getCoordinates(formData.dropoff_location) : null;

      // Clear existing markers and polylines
      if (mapRef.current) {
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            mapRef.current.removeLayer(layer);
          }
        });
      }

      const markers = [];
      const locations = [];

      if (currentCoords) {
        const marker = L.marker(currentCoords).addTo(mapRef.current).bindPopup("Current Location");
        markers.push(marker);
        locations.push(currentCoords);
      }

      if (pickupCoords) {
        const marker = L.marker(pickupCoords).addTo(mapRef.current).bindPopup("Pickup Location");
        markers.push(marker);
        locations.push(pickupCoords);
      }

      if (dropoffCoords) {
        const marker = L.marker(dropoffCoords).addTo(mapRef.current).bindPopup("Dropoff Location");
        markers.push(marker);
        locations.push(dropoffCoords);
      }

      // Draw lines between locations if we have multiple points
      if (locations.length > 1) {
        L.polyline(locations, { color: "blue", weight: 4, opacity: 0.7 }).addTo(mapRef.current);
      }

      // Adjust map view to show all markers
      if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        mapRef.current.fitBounds(group.getBounds().pad(0.5));
      }
    } catch (error) {
      console.error("Map update error:", error);
    }
  };

  // ---------------------
  // HANDLER FUNCTIONS
  // ---------------------
  const handleTripChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogsheetChange = (e) => {
    setNewLogsheetData({ ...newLogsheetData, [e.target.name]: e.target.value });
  };

  const handleEntryChange = (e) => {
    setNewEntryData({ ...newEntryData, [e.target.name]: e.target.value });
  };

  // ---------------------
  // SUBMISSION FUNCTIONS
  // ---------------------
  const submitTrip = async () => {
    setIsLoading(true);
    try {
      const res = await createTrip(formData);
      setTripData(res.data);
      setMessages({ 
        error: "", 
        success: `Trip created successfully! Trip ID: ${res.data.id}. Now add logsheets.` 
      });
      setActiveTab("logsheets");
    } catch (err) {
      console.error(err);
      setMessages({ 
        error: "Error creating trip. Please check your information and try again.", 
        success: "" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitLogsheet = async () => {
    if (!tripData) {
      setMessages({ 
        error: "Please create a trip first!", 
        success: "" 
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await createLogsheet({ ...newLogsheetData, trip: tripData.id });
      setLogsheetsData((prev) => [...prev, res.data]);
      setNewLogsheetData({
        date: new Date().toISOString().slice(0, 10),
        driving_hours: 0,
        on_duty_hours: 0,
        off_duty_hours: 0,
        sleeper_hours: 0,
        hours_left_in_cycle: 0,
        bol_number: "",
        shipper: "",
        commodity: "",
      });
      setMessages({ 
        error: "", 
        success: `Logsheet added successfully! Logsheet ID: ${res.data.id}. You can now add entries.` 
      });
      setActiveTab("entries");
    } catch (err) {
      console.error(err);
      setMessages({ 
        error: "Error creating logsheet. Please check your information and try again.", 
        success: "" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitEntry = async (logsheetId) => {
    setIsLoading(true);
    try {
      const res = await createEntry({ ...newEntryData, logsheet: logsheetId });
      setEntriesData((prev) => [...prev, res.data]);
      setNewEntryData({
        note: "",
        status: "Driving",
        start_time: new Date().toISOString().slice(0, 16),
        end_time: new Date().toISOString().slice(0, 16),
      });
      setMessages({ 
        error: "", 
        success: `Entry added successfully! Entry ID: ${res.data.id}` 
      });
    } catch (err) {
      console.error(err);
      setMessages({ 
        error: "Error creating entry. Please check your information and try again.", 
        success: "" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------
  // RENDER FUNCTIONS
  // ---------------------
  const renderStatusMessages = () => {
    return (
      <>
        {messages.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300 animate-fadeIn">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
            {messages.error}
          </div>
        )}
        {messages.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-300 animate-fadeIn">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            {messages.success}
          </div>
        )}
      </>
    );
  };

  const renderNavigationTabs = () => {
    return (
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 font-medium transition-all duration-300 ${activeTab === "trip" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-blue-500"}`}
          onClick={() => setActiveTab("trip")}
        >
          <FontAwesomeIcon icon={faTruck} className="mr-2" />
          Trip Details
        </button>
        <button
          className={`py-2 px-4 font-medium transition-all duration-300 ${activeTab === "logsheets" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"} ${!tripData ? "opacity-50 cursor-not-allowed" : "hover:text-blue-500"}`}
          onClick={() => tripData && setActiveTab("logsheets")}
          disabled={!tripData}
        >
          <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
          Logsheets
        </button>
        <button
          className={`py-2 px-4 font-medium transition-all duration-300 ${activeTab === "entries" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"} ${logsheetsData.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-blue-500"}`}
          onClick={() => logsheetsData.length > 0 && setActiveTab("entries")}
          disabled={logsheetsData.length === 0}
        >
          <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
          Entries
        </button>
        <button
          className={`py-2 px-4 font-medium transition-all duration-300 ${activeTab === "dashboard" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"} ${!tripData ? "opacity-50 cursor-not-allowed" : "hover:text-blue-500"}`}
          onClick={() => tripData && setActiveTab("dashboard")}
          disabled={!tripData}
        >
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
          Dashboard
        </button>
      </div>
    );
  };

  const renderLoadingIndicator = () => {
    return (
      isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded shadow-lg flex items-center animate-pulse">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin h-6 w-6 text-blue-500 mr-3" />
            <span>Processing...</span>
          </div>
        </div>
      )
    );
  };

  const renderTripForm = () => {
    return (
      activeTab === "trip" && (
        <div className="mb-6 p-5 border rounded bg-blue-50 animate-fadeIn">
          <h3 className="text-xl font-bold mb-4 text-blue-700">
            <FontAwesomeIcon icon={faTruck} className="mr-2" />
            Trip & Truck Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.replace(/_/g, " ").toUpperCase()}
                </label>
                <input
                  name={key}
                  value={formData[key]}
                  onChange={handleTripChange}
                  className="p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                />
              </div>
            ))}
          </div>
          <button 
            onClick={submitTrip} 
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4 text-white mr-2" />
                Creating Trip...
              </>
            ) : (
              "Create Trip"
            )}
          </button>
        </div>
      )
    );
  };

  const renderMap = () => {
    return (
      activeTab === "trip" && (
        <div className="mb-6 animate-fadeIn">
          <h3 className="text-xl font-bold mb-2 text-blue-700">
            <FontAwesomeIcon icon={faRoute} className="mr-2" />
            Route Map
          </h3>
          <div id="map" style={{ height: "400px", width: "100%", borderRadius: "8px" }}></div>
          <p className="text-sm text-gray-500 mt-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-1" />
            Current Location
            <FontAwesomeIcon icon={faWarehouse} className="text-blue-500 mx-2 ml-4" />
            Pickup Location
            <FontAwesomeIcon icon={faMapPin} className="text-blue-500 mx-2 ml-4" />
            Dropoff Location
          </p>
        </div>
      )
    );
  };

  const renderLogsheetForm = () => {
    return (
      activeTab === "logsheets" && tripData && (
        <div className="mb-6 p-5 border rounded bg-blue-50 animate-fadeIn">
          <h3 className="text-xl font-bold mb-4 text-blue-700">
            <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
            Add Logsheet for Trip #{tripData.id}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {Object.keys(newLogsheetData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.replace(/_/g, " ").toUpperCase()}
                </label>
                {key.includes("hours") || key === "hours_left_in_cycle" ? (
                  <input
                    type="number"
                    name={key}
                    value={newLogsheetData[key]}
                    onChange={handleLogsheetChange}
                    className="p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                  />
                ) : key === "date" ? (
                  <input
                    type="date"
                    name={key}
                    value={newLogsheetData[key]}
                    onChange={handleLogsheetChange}
                    className="p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                  />
                ) : (
                  <input
                    name={key}
                    value={newLogsheetData[key]}
                    onChange={handleLogsheetChange}
                    className="p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                  />
                )}
              </div>
            ))}
          </div>
          <button 
            onClick={submitLogsheet} 
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4 text-white mr-2" />
                Adding Logsheet...
              </>
            ) : (
              "Add Logsheet"
            )}
          </button>
        </div>
      )
    );
  };

  const renderLogsheetsList = () => {
    return (
      activeTab === "logsheets" && logsheetsData.length > 0 && (
        <div className="mb-6 animate-fadeIn">
          <h3 className="text-xl font-bold mb-4 text-blue-700">Your Logsheets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {logsheetsData.map((logsheet) => (
              <div key={logsheet.id} className="p-4 border rounded bg-white shadow transition-all duration-300 hover:shadow-lg">
                <h4 className="font-bold mb-2 text-blue-600">Logsheet #{logsheet.id}</h4>
                <div className="text-sm">
                  {Object.entries(logsheet).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b py-1">
                      <span className="font-medium">{key.replace(/_/g, " ")}:</span>
                      <span>{typeof value === "object" ? JSON.stringify(value) : value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    );
  };

  const renderEntryForm = () => {
    return (
      activeTab === "entries" && logsheetsData.length > 0 && (
        <div className="mb-6 p-5 border rounded bg-blue-50 animate-fadeIn">
          <h3 className="text-xl font-bold mb-4 text-blue-700">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
            Add Entry
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Logsheet</label>
            <select 
              className="p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
              onChange={(e) => setNewEntryData({...newEntryData, logsheet: e.target.value})}
            >
              <option value="">Select a logsheet</option>
              {logsheetsData.map((logsheet) => (
                <option key={logsheet.id} value={logsheet.id}>
                  Logsheet #{logsheet.id} - {new Date(logsheet.date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">STATUS</label>
              <select 
                name="status" 
                value={newEntryData.status} 
                onChange={handleEntryChange} 
                className="p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
              >
                <option value="Driving">Driving</option>
                <option value="Off Duty">Off Duty</option>
                <option value="On Duty">On Duty</option>
                <option value="Sleeper">Sleeper</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NOTE</label>
              <input 
                name="note" 
                value={newEntryData.note} 
                onChange={handleEntryChange} 
                placeholder="Note" 
                className="p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">START TIME</label>
              <input 
                type="datetime-local" 
                name="start_time" 
                value={newEntryData.start_time} 
                onChange={handleEntryChange} 
                className="p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">END TIME</label>
              <input 
                type="datetime-local" 
                name="end_time" 
                value={newEntryData.end_time} 
                onChange={handleEntryChange} 
                className="p-2 border rounded w-full focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
              />
            </div>
          </div>
          
          <button 
            onClick={() => submitEntry(newEntryData.logsheet)} 
            disabled={isLoading || !newEntryData.logsheet}
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4 text-white mr-2" />
                Adding Entry...
              </>
            ) : (
              "Add Entry"
            )}
          </button>
        </div>
      )
    );
  };

  const renderEntriesTable = () => {
    return (
      activeTab === "entries" && entriesData.length > 0 && (
        <div className="mb-6 p-5 border rounded bg-blue-50 animate-fadeIn">
          <h3 className="text-xl font-bold mb-4 text-blue-700">All Entries</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">Logsheet</th>
                  <th className="border p-2 text-left">Note</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left">Start</th>
                  <th className="border p-2 text-left">End</th>
                </tr>
              </thead>
              <tbody>
                {entriesData.map((entry) => (
                  <tr key={entry.id} className="hover:bg-blue-100 transition-colors duration-200">
                    <td className="border p-2">{entry.id}</td>
                    <td className="border p-2">{entry.logsheet}</td>
                    <td className="border p-2">{entry.note}</td>
                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        entry.status === "Driving" ? "bg-blue-100 text-blue-800" :
                        entry.status === "Off Duty" ? "bg-green-100 text-green-800" :
                        entry.status === "On Duty" ? "bg-yellow-100 text-yellow-800" :
                        "bg-purple-100 text-purple-800"
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="border p-2">{new Date(entry.start_time).toLocaleString()}</td>
                    <td className="border p-2">{new Date(entry.end_time).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    );
  };

  const renderDashboard = () => {
    if (!tripData || activeTab !== "dashboard") return null;
    
    return (
      <div className="mt-6 p-4 border rounded bg-blue-50 animate-fadeIn">
        <h3 className="text-xl font-bold mb-4 text-blue-700">
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
          Trip Dashboard
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow transition-all duration-300 hover:shadow-lg">
            <h4 className="font-bold mb-2 text-blue-600">Trip Information</h4>
            <p><strong>Trip ID:</strong> {tripData.id}</p>
            <p><strong>Carrier:</strong> {tripData.carrier_name}</p>
            <p><strong>Tractor:</strong> {tripData.tractor_number}</p>
            <p><strong>Trailer:</strong> {tripData.trailer_number}</p>
          </div>
          
          <div className="p-4 bg-white rounded shadow transition-all duration-300 hover:shadow-lg">
            <h4 className="font-bold mb-2 text-blue-600">Route Information</h4>
            <p><strong>Current:</strong> {tripData.current_location}</p>
            <p><strong>Pickup:</strong> {tripData.pickup_location}</p>
            <p><strong>Dropoff:</strong> {tripData.dropoff_location}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-bold mb-2 text-blue-600">Logsheets Summary</h4>
          {logsheetsData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {logsheetsData.map((logsheet) => (
                <div key={logsheet.id} className="p-3 bg-white rounded shadow transition-all duration-300 hover:shadow-lg">
                  <p><strong>Logsheet ID:</strong> {logsheet.id}</p>
                  <p><strong>Date:</strong> {new Date(logsheet.date).toLocaleDateString()}</p>
                  <p><strong>Driving Hours:</strong> {logsheet.driving_hours}</p>
                  <p><strong>BOL:</strong> {logsheet.bol_number}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No logsheets added yet.</p>
          )}
        </div>
        
        <div>
          <h4 className="font-bold mb-2 text-blue-600">Recent Entries</h4>
          {entriesData.length > 0 ? (
            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Start Time</th>
                    <th className="p-2 text-left">End Time</th>
                    <th className="p-2 text-left">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {entriesData.slice(-5).map((entry) => (
                    <tr key={entry.id} className="border-t hover:bg-blue-50 transition-colors duration-200">
                      <td className="p-2">{entry.status}</td>
                      <td className="p-2">{new Date(entry.start_time).toLocaleString()}</td>
                      <td className="p-2">{new Date(entry.end_time).toLocaleString()}</td>
                      <td className="p-2">{entry.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No entries added yet.</p>
          )}
        </div>
      </div>
    );
  };

  // ---------------------
  // MAIN RENDER
  // ---------------------
  return (
    <div className="max-w-6xl mx-auto mt-6 bg-white p-6 rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-800 animate-pulse">
        <FontAwesomeIcon icon={faTruck} className="mr-2" />
        Create New Trip
      </h2>

      {renderStatusMessages()}
      {renderNavigationTabs()}
      {renderLoadingIndicator()}
      {renderTripForm()}
      {renderMap()}
      {renderLogsheetForm()}
      {renderLogsheetsList()}
      {renderEntryForm()}
      {renderEntriesTable()}
      {renderDashboard()}
    </div>
  );
};

export default CreateTrip;