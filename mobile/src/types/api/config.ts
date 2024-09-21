import axios from "axios";

const API_CONFIG = axios.create({
  baseURL: process.env.API_ENDPOINT,
  responseType: "json",
  withCredentials: true,
});

export default API_CONFIG;
