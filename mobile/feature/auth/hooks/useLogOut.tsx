import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

const useLogOut = () => {
  const handleLogout = async () => {
    try {
      // Xóa token khỏi AsyncStorage
      await AsyncStorage.removeItem("token");
      // Điều hướng đến màn hình đăng nhập
      router.replace("/(auth)/sign-in"); // Giả sử màn hình đăng nhập có đường dẫn là "/login"
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };
  return {
    handleLogout,
  };
};
export default useLogOut;
