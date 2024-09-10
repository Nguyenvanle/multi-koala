import axios from "axios";

const API_CONFIG = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://humbly-thankful-mackerel.ngrok-free.app/",
  responseType: "json",
  withCredentials: true,
});
