import { useState } from "react";

export const useFormHandlers = () => {
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
    logsheet: "",
  });

  const handleTripChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogsheetChange = (e) => {
    setNewLogsheetData({ ...newLogsheetData, [e.target.name]: e.target.value });
  };

  const handleEntryChange = (e) => {
    setNewEntryData({ ...newEntryData, [e.target.name]: e.target.value });
  };

  return {
    formData,
    newLogsheetData,
    newEntryData,
    handleTripChange,
    handleLogsheetChange,
    handleEntryChange,
    setNewLogsheetData,
    setNewEntryData
  };
};