import { useEffect, useState } from "react";
import { UserBody } from "../../user/types/user";
import { userServices } from "../../user/services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserBody | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const getUser = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setErrorMessage("No token found. Please log in.");
        return;
      }
      const response = await userServices.user({ token }); // Truyền token vào hàm user
      console.log(response.data.result);
      console.log(response.data.result.token);
      if (response.data.result) {
        setUser(response.data.result);
      } else {
        setErrorMessage("User does not exist.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
