import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Định nghĩa kiểu dữ liệu cho User
interface User {
  token: string;
  firstname: string;
  lastname: string;
}

// Định nghĩa kiểu dữ liệu cho UserContext
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Tạo context với giá trị mặc định là undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Props cho UserProvider
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const firstname = await AsyncStorage.getItem("userFirstname");
        const lastname = await AsyncStorage.getItem("userLastname");

        if (token && firstname && lastname) {
          setUser({ token, firstname, lastname });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook để sử dụng UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
