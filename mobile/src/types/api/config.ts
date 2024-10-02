import axios from "axios";

const API_CONFIG = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_ENDPOINT,
  responseType: "json",
  withCredentials: true,
});

// Thêm interceptor để xử lý lỗi
API_CONFIG.interceptors.response.use(
  (response) => response, // Nếu thành công, trả về response
  (error) => {
    // Bỏ qua lỗi và trả về một Promise đã hoàn thành
    return Promise.resolve(); // Hoặc có thể trả về một giá trị mặc định nếu cần
  }
);

export default API_CONFIG;
