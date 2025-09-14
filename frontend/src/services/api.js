import axios from "axios";

const api = axios.create({
  baseURL: "https://trip-management.railway.app/api/",
});

export default api;
