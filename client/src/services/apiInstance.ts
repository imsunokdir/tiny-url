import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});
