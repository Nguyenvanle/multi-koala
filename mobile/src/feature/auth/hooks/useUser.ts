import { useEffect, useState } from "react";
import { UserBody } from "../types/user";
import { userServices } from "../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState<UserBody | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getUser = async () => {
    try {
      setLoading(true); // Bắt đầu loading
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found. Please log in.");
        return;
      }
      const data = await userServices.user(token); // Gọi API với token

      if (data.data.result) {
        setUser(data.data.result); // Cập nhật người dùng
      } else {
        setErrorMessage("User does not exist.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch user data.");
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  useEffect(() => {
    getUser(); // Gọi hàm getUser khi hook khởi tạo
  }, []);

  return {
    loading,
    error,
    user,
    setUser,
    errorMessage,
    setErrorMessage,
  };
};

export default useUser;
