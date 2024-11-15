import { useState } from "react";
import { ResultRes, SignUpRes } from "../types/signup";
import { signUpServices } from "../services/signup";
import { router } from "expo-router";

const useSignUp = () => {
  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [errorMessageSignUp, setErrorMessageSignUp] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [password, setPassWord] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const onSubmit = async () => {
    if (!username) {
      setErrorMessageSignUp("Please enter your username.");
      return;
    }
    if (!password) {
      setErrorMessageSignUp("Please enter your password.");
      return;
    }
    if (!firstname) {
      setErrorMessageSignUp("Please enter your first name.");
      return;
    }
    if (!lastname) {
      setErrorMessageSignUp("Please enter your last name.");
      return;
    }
    if (confirm !== password) {
      setErrorMessageSignUp("Confirm invalid password.");
      return;
    }

    try {
      setLoadingSignUp(true);
      setErrorMessageSignUp(null);
      const signUpData: SignUpRes = {
        username,
        password,
        firstname,
        lastname,
        email,
      };
      console.log(signUpData);
      const response = await signUpServices.signUp(signUpData);
      const dataRes: ResultRes = response.data;
      console.log(response.data.result);
      if (dataRes && dataRes.result) {
        router.replace("/(auth)/sign-in");
      } else {
        setErrorMessageSignUp("Sign up failed.");
      }
    } catch (error: any) {
      setErrorMessageSignUp("Email not found! Please try again.");
    } finally {
      setLoadingSignUp(false);
    }
  };

  return {
    loadingSignUp,
    errorMessageSignUp,
    username,
    setUserName,
    password,
    setPassWord,
    email,
    setEmail,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    confirm,
    setConfirm,
    onSubmit,
  };
};

export default useSignUp;
