import axios from "axios";
import { LoginBodyType } from "../types/login";

const API_URL = "https://humbly-thankful-mackerel.ngrok-free.app/auth/login"; // Đường dẫn đến API

export const loginService = async (data: LoginBodyType) => {
  try {
    const response = await axios.post(API_URL, data);
    return { result: response.data, error: null };
  } catch (error: any) {
    return {
      result: null,
      error: error.response?.data.message || "Login failed",
      code: error.response?.status,
    };
  }
};
