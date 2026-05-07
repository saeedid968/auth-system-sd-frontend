import axios from "axios";

const isLocalBrowser = ["localhost", "127.0.0.1"].includes(window.location.hostname);
const DEFAULT_API_URL = isLocalBrowser
    ? "http://localhost:4000/api"
    : "https://auth-system-sd.up.railway.app/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_API_URL;
const normalizedBaseURL = API_BASE_URL.replace(/\/$/, "");
const baseURL = normalizedBaseURL.endsWith("/api")
    ? normalizedBaseURL
    : `${normalizedBaseURL}/api`;

const API = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 20000
});

export default API;
