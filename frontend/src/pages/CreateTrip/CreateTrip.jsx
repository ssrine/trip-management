import React, { useState } from "react";
import { createTrip } from "../../services/tripService";
import { createLogsheet } from "../../services/logsheetService";
import { createEntry } from "../../services/entryService";

// Import components
import StatusMessages from "./components/StatusMessages";
import NavigationTabs from "./components/NavigationTabs";
import LoadingIndicator from "./components/LoadingIndicator";
import TripForm from "./components/TripForm";
import MapComponent from "./components/MapComponent";
import LogsheetForm from "./components/LogsheetForm";
import LogsheetsList from "./components/LogsheetsList";
import EntryForm from "./components/EntryForm";
import EntriesTable from "./components/EntriesTable";
import Dashboard from "./components/Dashboard";

// Import hooks
import { useMessages } from "./hooks/useMessages";
import { useMap } from "./hooks/useMap";
import { useFormHandlers } from "./hooks/useFormHandlers";

// Import assets
import logisticsBg from "../../assets/truk.jpg";

const CreateTrip = () => {
  const [tripData, setTripData] = useState(null);
  const [logsheetsData, setLogsheetsData] = useState([]);
  const [entriesData, setEntriesData] = useState([]);
  const [activeTab, setActiveTab] = useState("trip");
  const [isLoading, setIsLoading] = useState(false);

  const { messages, setMessages } = useMessages();
  const { mapRef, updateMap } = useMap();
  const { 
    formData, 
    newLogsheetData, 
    newEntryData, 
    handleTripChange, 
    handleLogsheetChange, 
    handleEntryChange, 
    setNewLogsheetData,
    setNewEntryData
  } = useFormHandlers();

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
        logsheet: "",
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

  return (
    <div 
      className="min-h-screen bg-gray-50 py-6 px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.98)), url(${logisticsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-amber-400/10 to-amber-600/10 animate-float"
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

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl shadow-2xl overflow-hidden mb-8 relative">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 p-6 md:p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg mr-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Create New Trip
              </h2>
            </div>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Streamline your logistics operations with our comprehensive trip management system
            </p>
            
            <div className="flex justify-center mt-6">
              {['trip', 'logsheets', 'entries', 'dashboard'].map((tab, index) => (
                <div key={tab} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    activeTab === tab 
                      ? 'bg-amber-500 border-amber-500 text-white' 
                      : index < ['trip', 'logsheets', 'entries', 'dashboard'].indexOf(activeTab) 
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-white/20 border-white/30 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      index < ['trip', 'logsheets', 'entries', 'dashboard'].indexOf(activeTab) 
                        ? 'bg-green-500' 
                        : 'bg-white/30'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <StatusMessages messages={messages} />
          
          <NavigationTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            tripData={tripData}
            logsheetsData={logsheetsData}
          />
          
          <div className="p-6">
            <LoadingIndicator isLoading={isLoading} />
            
            <TripForm 
              activeTab={activeTab}
              formData={formData}
              handleTripChange={handleTripChange}
              submitTrip={submitTrip}
              isLoading={isLoading}
            />
            
            <MapComponent 
              activeTab={activeTab}
              formData={formData}
              updateMap={updateMap}
              mapRef={mapRef}
            />
            
            <LogsheetForm 
              activeTab={activeTab}
              tripData={tripData}
              newLogsheetData={newLogsheetData}
              handleLogsheetChange={handleLogsheetChange}
              submitLogsheet={submitLogsheet}
              isLoading={isLoading}
            />
            
            <LogsheetsList 
              activeTab={activeTab}
              logsheetsData={logsheetsData}
            />
            
            <EntryForm 
              activeTab={activeTab}
              logsheetsData={logsheetsData}
              newEntryData={newEntryData}
              handleEntryChange={handleEntryChange}
              setNewEntryData={setNewEntryData}
              submitEntry={submitEntry}
              isLoading={isLoading}
            />
            
            <EntriesTable 
              activeTab={activeTab}
              entriesData={entriesData}
            />
            
            <Dashboard 
              activeTab={activeTab}
              tripData={tripData}
              logsheetsData={logsheetsData}
              entriesData={entriesData}
            />
          </div>
        </div>
        
        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Need assistance? Contact our support team at support@trucklog.com</p>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          .animate-float {
            animation: float 8s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default CreateTrip;