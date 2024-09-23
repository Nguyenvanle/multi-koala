import { useState } from "react";
import { router } from "expo-router";
import { registerServices } from "../services/register";

const useRegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async () => {
    // const validateEmail = (email: string) => {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   return emailRegex.test(email);
    // };
    // if (email == "") {
    //   setErrorMessage("Please enter your Email address.");
    //   return;
    // }
    try {
      setLoading(true);
      const data = await registerServices.register({ email });

      if (data.data.result) {
        router.push("/(auth)/confirm");
      } else {
        setErrorMessage("Email not found.");
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
    email,
    setEmail,
    errorMessage,
  };
};

export default useRegisterForm;
