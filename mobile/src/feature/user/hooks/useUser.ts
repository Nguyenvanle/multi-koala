import { useEffect, useState } from "react";
import { UserBody } from "../../user/types/user";
import { userServices } from "../../user/services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserBody>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found. Please log in.");
          return;
        }

        const response = await userServices.user({ token });
        // Kiểm tra dữ liệu trả về
        if (response.data.result) {
          setUser(response.data.result);
        } else {
          setErrorMessage("User does not exist or invalid response.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data. " + error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return {
    loading,
    user,
    setUser,
    errorMessage,
    setErrorMessage,
  };
};

export default useUser;
