import axios from "axios";

const api = axios.create({
  baseURL: "https://trip-management-production.up.railway.app/api/",
});

export default api;
