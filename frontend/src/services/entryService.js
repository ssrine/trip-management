import api from "./api";

// GET all entries
export const getEntries = () => api.get("entries/");

// GET entry by ID
export const getEntryById = (id) => api.get(`entries/${id}/`);

// POST new entry
export const createEntry = (entryData) => api.post("entries/", entryData);

// PUT / PATCH: Update an existing entry by ID
export const updateEntry = (id, entryData) => api.put(`entries/${id}/`, entryData);
