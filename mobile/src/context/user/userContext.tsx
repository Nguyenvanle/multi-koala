import { UserBody, UserRes } from "@/src/feature/user/types/user";
import API_CONFIG from "@/src/types/api/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Định nghĩa kiểu cho Context
interface UserContextType {
  user: UserBody | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserBody | undefined>>;
  loading: boolean;
  error: string | null;
}

// Tạo context với giá trị mặc định
export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  loading: false,
  error: null,
});

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserBody | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const responseUser = await API_CONFIG.get<UserRes>("/students/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (responseUser && responseUser.data && responseUser.data.result) {
          setUser(responseUser.data.result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Hàm cập nhật user với typing chính xác
  const updateUser = (update: React.SetStateAction<UserBody | undefined>) => {
    setUser(update);
  };

  const contextValue: UserContextType = {
    user,
    setUser: updateUser,
    loading,
    error,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
