import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useRouter } from "expo-router";

export const useLogout = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  const logout = async () => {
    try {
      // Xóa token và dữ liệu user
      await AsyncStorage.multiRemove(["token", "userPreferences"]);

      // Reset user state
      setUserData(null);

      // Hủy các kết nối và tasks (nếu có)

      // Chuyển hướng về màn hình đăng nhập
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return logout;
};
