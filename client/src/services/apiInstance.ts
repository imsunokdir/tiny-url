import axios from "axios";
import type { Link, CreateLinkInput } from "../types";
("");
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});
