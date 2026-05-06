import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const normalizedBaseURL = API_BASE_URL.replace(/\/$/, "");
const baseURL = normalizedBaseURL.endsWith("/api")
    ? normalizedBaseURL
    : `${normalizedBaseURL}/api`;

const API = axios.create({
    baseURL,
    withCredentials: true
});

export default API;
