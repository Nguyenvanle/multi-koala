import { useState } from "react";
import { router } from "expo-router";
import { registerServices } from "../services/register";

const useRegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async () => {
    try {
      setLoading(true);
      // const data = await registerServices.register({
      //   email,
      //   username,
      //   password,
      //   firstName,
      //   lastName,
      // });

      // if (data.data.result) {
      router.replace("/(auth)/sign-in");
      // setUsername;
      // setPassword;
      // setEmail;
      // setFirstName;
      // setLastName;
      // } else {
      //   setErrorMessage("Sign Up failed.");
      // }
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
    username,
    setUsername,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    errorMessage,
    setErrorMessage,
  };
};

export default useRegisterForm;
