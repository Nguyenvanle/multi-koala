import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserBody, UserPost } from "../types/user-update";
import { userUpdateServices } from "./../services/user-update";

const useUserUpdate = () => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [userUpdate, setUserUpdate] = useState<UserBody>();
  const [errorMessageUpdate, setErrorMessageUpdate] = useState<string>("");
  const [updated, setUpdated] = useState<UserPost | null>(null);

  useEffect(() => {
    const getUserUpdate = async () => {
      try {
        setLoadingUpdate(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setErrorMessageUpdate("No token found. Please log in.");
          return;
        }
        if (updated) {
          const response = await userUpdateServices.getUserUpdate(
            { submitUpdate: updated }, // Wrap updated in an object
            { token }
          );
          if (response.data.result) {
            setUserUpdate(response.data.result);
          } else {
            setErrorMessageUpdate("User does not exist or invalid response.");
          }
        } else {
          setErrorMessageUpdate("No update data available.");
        }
      } catch (error) {
        setErrorMessageUpdate("Failed to fetch user data. " + error);
      } finally {
        setLoadingUpdate(false);
      }
    };

    getUserUpdate();
  }, [updated]);

  return {
    loadingUpdate,
    userUpdate,
    setUserUpdate,
    errorMessageUpdate,
    setErrorMessageUpdate,
    updated,
    setUpdated,
  };
};

export default useUserUpdate;
