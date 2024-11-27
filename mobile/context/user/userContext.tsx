import { UserBody, UserRes } from "@/feature/user/types/user";
import API_CONFIG from "@/types/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface UserContextType {
  user: UserBody | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserBody | undefined>>;
  loading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>; // Thêm method để fetch user data
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  loading: false,
  error: null,
  fetchUserData: async () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserBody | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Tách riêng method fetch user data để có thể gọi lại
  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      // Kiểm tra nếu không có token thì không fetch
      if (!token) {
        setUser(undefined);
        setLoading(false);
        return;
      }

      const responseUser = await API_CONFIG.get<UserRes>("/students/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (responseUser && responseUser.data && responseUser.data.result) {
        setUser(responseUser.data.result);
      } else {
        setUser(undefined);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      // Nếu lỗi (ví dụ token hết hạn), xóa token và user
      await AsyncStorage.removeItem("token");
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  // Gọi fetch user data khi component mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Hàm cập nhật user với typing chính xác
  const updateUser = (update: React.SetStateAction<UserBody | undefined>) => {
    setUser(update);
  };

  const contextValue: UserContextType = {
    user,
    setUser: updateUser,
    loading,
    error,
    fetchUserData, // Thêm method vào context
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
