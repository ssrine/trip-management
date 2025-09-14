import api from "./api";

// GET all trips
export const getTrips = () => api.get("trips/");

// GET single trip by ID
export const getTripById = (id) => api.get(`trips/${id}/`);

// POST new trip
export const createTrip = (tripData) => api.post("trips/", tripData);

// GET PDF
export const downloadTripPdf = (id) => api.get(`trips/${id}/pdf/`, { responseType: 'blob' });
