import React, { useState } from "react";
import { createEntry } from "../services/entryService";

export default function CreateEntry() {
  const [formData, setFormData] = useState({
    logsheet: "",
    status: "",
    start_time: "",
    end_time: "",
    note: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEntry(formData);
      alert("Entry created!");
      setFormData({ logsheet: "", status: "", start_time: "", end_time: "", note: "" });
    } catch (err) {
      console.error(err);
      alert("Error creating entry");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Entry</h2>
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
        <button className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600" type="submit">
          Submit Entry
        </button>
      </form>
    </div>
  );
}
