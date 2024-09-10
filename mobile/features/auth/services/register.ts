import axios from "axios";
import { RegisterBodyType } from "../types/register";

const API_URL = "https://your-api-url.com/register"; // Đường dẫn đến API

export const registerService = async (data: RegisterBodyType) => {
  try {
    const response = await axios.post(API_URL, data);
    return { result: response.data, error: null };
  } catch (error: any) {
    return {
      result: null,
      error: error.response?.data.message || "Registration failed",
      code: error.response?.status,
    };
  }
};
