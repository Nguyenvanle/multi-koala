import axios from "axios";

const API_MAIN = axios.create({
  baseURL: "https://humbly-thankful-mackerel.ngrok-free.app",
  responseType: "json",
  withCredentials: true,
});

export default API_MAIN;
