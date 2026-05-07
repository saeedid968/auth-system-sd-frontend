import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://auth-system-sd.up.railway.app/api";
const normalizedBaseURL = API_BASE_URL.replace(/\/$/, "");
const baseURL = normalizedBaseURL.endsWith("/api")
    ? normalizedBaseURL
    : `${normalizedBaseURL}/api`;

const API = axios.create({
    baseURL,
    withCredentials: true
});

export default API;
