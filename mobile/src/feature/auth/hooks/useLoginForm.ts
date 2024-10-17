import { useState } from "react";
import { router } from "expo-router";
import { loginServices } from "../services/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginBody, LoginRes } from "../types/login";

const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const loginData: LoginBody = { username, password };
      const response = await loginServices.login(loginData);
      const data: LoginRes = response.data;
      // console.log(response.data.result.token);
      if (data.code === 200 && data.result.token) {
        await AsyncStorage.setItem("token", data.result.token);
        router.replace("/(home)/home");
      } else {
        setError(error);
      }
    } catch (err: any) {
      setError("User not found! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    username,
    setUsername,
    password,
    setPassword,
    onSubmit,
  };
};

export default useLoginForm;
