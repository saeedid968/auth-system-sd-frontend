import axios from "axios";

const API = axios.create({
    baseURL: "https://auth-system-sd.vercel.app/",
    withCredentials: true
});

export default API;