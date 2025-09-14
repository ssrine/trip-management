import axios from "axios";

// Configuring Axios instance for backend API
// Base URL points to Django backend
const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export default api;
