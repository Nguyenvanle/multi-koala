import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserBody, UserPost } from "../types/user-update";
import { userUpdateServices } from "./../services/user-update";

const useUserUpdate = () => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorMessageUpdate, setErrorMessageUpdate] = useState<string>("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const updateUser = async (updatedData: UserPost) => {
    try {
      setLoadingUpdate(true);
      setErrorMessageUpdate("");
      setUpdateSuccess(false);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setErrorMessageUpdate("No token found. Please log in.");
        return null;
      }

      const response = await userUpdateServices.getUserUpdate(
        updatedData,
        token
      );

      if (response && response.data && response.data.result) {
        setUpdateSuccess(true);
        return response.data.result;
      } else {
        setErrorMessageUpdate("Failed to update user data.");
        return null;
      }
    } catch (error) {
      setErrorMessageUpdate("Failed to update user data. " + error);
      return null;
    } finally {
      setLoadingUpdate(false);
    }
  };

  return {
    loadingUpdate,
    errorMessageUpdate,
    updateSuccess,
    updateUser,
  };
};

export default useUserUpdate;
