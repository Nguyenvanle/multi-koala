import { UserContext } from "@/context/user/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useContext } from "react";
import { Alert } from "react-native";

export const useLogOut = () => {
  const { setUser } = useContext(UserContext); // Giả sử bạn có hook context quản lý user

  const handleLogout = async () => {
    try {
      // Xóa token khỏi AsyncStorage
      await AsyncStorage.removeItem("token");

      // Reset user context về trạng thái ban đầu
      setUser(null); // Đặt user thành null hoặc trạng thái khởi tạo ban đầu

      // Điều hướng đến màn hình đăng nhập
      router.replace("/(auth)/sign-in");
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return { handleLogout };
};
