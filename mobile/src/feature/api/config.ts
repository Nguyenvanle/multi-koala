import axios from "axios";

const API_MAIN = axios.create({
  baseURL: "https://hopeful-reptile-seemingly.ngrok-free.app",
  responseType: "json",
  withCredentials: true,
});

export default API_MAIN;
