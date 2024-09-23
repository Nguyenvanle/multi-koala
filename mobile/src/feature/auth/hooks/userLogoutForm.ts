import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { logoutServices } from "../services/logout";

const useLogoutForm = async () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState<string>("");

  const outSubmit = async () => {
    try {
      setLoading(true);
      const remove = await logoutServices.logout({ token });

      if (remove.data.result) {
        await AsyncStorage.removeItem(remove.data.result.token);
        router.replace("/(auth)/sign-in");
      }
    } catch (error) {
      error;
    }
  };
  return {
    loading,
    error,
    outSubmit,
    token,
    setToken,
  };
};
export default useLogoutForm;
