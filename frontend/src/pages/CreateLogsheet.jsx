import React, { useState } from "react";
import { createLogsheet } from "../services/logsheetService";

export default function CreateLogsheet() {
  const [formData, setFormData] = useState({
    trip: "",
    date: "",
    driving_hours: 0,
    on_duty_hours: 0,
    off_duty_hours: 0,
    sleeper_hours: 0,
    hours_left_in_cycle: 0,
    remarks: "",
    bol_number: "",
    shipper: "",
    commodity: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLogsheet(formData);
      alert("Logsheet created!");
      setFormData({
        trip: "",
        date: "",
        driving_hours: 0,
        on_duty_hours: 0,
        off_duty_hours: 0,
        sleeper_hours: 0,
        hours_left_in_cycle: 0,
        remarks: "",
        bol_number: "",
        shipper: "",
        commodity: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error creating logsheet");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Logsheet</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key.replace("_", " ").toUpperCase()}
            className="p-2 border rounded"
          />
        ))}
        <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600" type="submit">
          Submit Logsheet
        </button>
      </form>
    </div>
  );
}
