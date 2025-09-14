import api from "./api";

// GET all logsheets
export const getLogsheets = () => api.get("logsheets/");

// GET logsheet by ID
export const getLogsheetById = (id) => api.get(`logsheets/${id}/`);

// POST new logsheet
export const createLogsheet = (logsheetData) => api.post("logsheets/", logsheetData);
