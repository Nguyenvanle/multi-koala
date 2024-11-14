import { useCallback, useEffect, useState } from "react";
import { UserBody } from "../types/user";
import { userServices } from "../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const [loadingUser, setLoadingUser] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); // New state for refresh loading
  const [user, setUser] = useState<UserBody | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshUser = useCallback(async () => {
    try {
      setLoadingUser(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found. Please log in.");
        return;
      }

      const response = await userServices.getUser({ token });
      if (response && response.data && response.data.result) {
        setUser(response.data.result);
      } else {
        setErrorMessage("User does not exist or invalid response.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch user data. " + error);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoadingUser(true);
        await refreshUser();
      } finally {
        setLoadingUser(false);
      }
    };

    getUser();
  }, [refreshTrigger]);

  return {
    loadingUser,
    isRefreshing,
    user,
    setUser,
    errorMessage,
    setErrorMessage,
    refreshUser,
  };
};

export default useUser;
