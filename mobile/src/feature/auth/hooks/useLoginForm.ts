import { useEffect, useState } from "react";
import { router } from "expo-router";
import { loginServices } from "../services/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async () => {
    try {
      setLoading(true);
      const form = { username, password };
      console.log(form);
      const data = await loginServices.login(form);
      console.log(data.data.result);
      if (data.data.result) {
        await AsyncStorage.setItem("token", data.data.result.token);
        console.log();
        router.replace("/(home)/home");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred");
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
