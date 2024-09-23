import { useState } from "react";
import { router } from "expo-router";
import { loginServices } from "../services/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async () => {
    if (!username || !password) {
      setErrorMessage("Please enter your Username and Password");
      return;
    }
    if (!username) {
      setErrorMessage("Please enter your Username");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your Password");
      return;
    }
    try {
      setLoading(true);
      const data = await loginServices.login({ username, password });

      if (data.data.result) {
        await AsyncStorage.setItem("token", data.data.result.token);
        router.replace("/(home)/home");
      } else {
        setError(error); // Thông báo lỗi nếu không thành công
      }
    } catch (error: any) {
      setError(error); // Thông báo lỗi nếu có lỗi
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    onSubmit,
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
  };
};

export default useLoginForm;
