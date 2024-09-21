import { useState } from "react";
import { UserBody } from "../types/user";
import { router } from "expo-router";
import { authServices } from "../services/auth";

const useLoginForm = (username: string, password: string) => {
  const [user, setUser] = useState<UserBody | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await authServices.login(username, password);
      if (data?.result?.user) {
        setUser(data.result.user);
        router.replace("/(home)/home");
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { user, loading, error, onSubmit };
};

export default useLoginForm;
