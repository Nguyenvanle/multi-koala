"use client";

import { toast } from "@/components/ui/use-toast";
import { checkTokenValidity } from "@/features/auth/actions/check-token";
import { logoutAction } from "@/features/auth/actions/logout";
import { refreshTokenAction } from "@/features/auth/actions/refresh-token";
import { UserResType } from "@/features/users/schema/user";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: UserResType | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: UserResType) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserResType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();
  const currentPath = usePathname();


  const refreshAccessTokenInBackground = useCallback(async () => {
    try {
      console.log("Refreshing:", new Date().toLocaleTimeString());
      const refreshedData = await refreshTokenAction();

      if (refreshedData) {
        setIsAuthenticated(true);

        console.log("refresh:", true);
        return true;
      } else {
        console.log("Refresh fail, logout action");
        await handleLogout();

        return false;
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      // Nếu có lỗi khi refresh, tự động logout
      await handleLogout();
      return false;
    }
  }, []);

  const initializeAuth = useCallback(async () => {
    setLoading(true);

    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }

      if (!currentPath.includes("/dashboard")) return;

      console.log("Init refreshing,", new Date().toLocaleTimeString());
      const success = await refreshAccessTokenInBackground();

      if (!success) {
        await handleLogout();
        router.replace("/login");

        toast({
          title: "Session Expired",
          description: "Your session has expired, please log in again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      await handleLogout();

      toast({
        title: "Session Expired",
        description: "Your session has expired, please log in again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [currentPath, refreshAccessTokenInBackground, router]);

  useEffect(() => {
    initializeAuth();

    const intervalId = setInterval(
      async () => {
        console.log("Attempting to refresh token in background...");
        const success = await refreshAccessTokenInBackground();
        if (!success) {
          console.log(
            "Failed to refresh token, user may need to log in again."
          );
          clearInterval(intervalId); // Dừng việc refresh nếu không thành công
        }
      },
      45 * 60 * 1000
    ); // 45 phút

    return () => clearInterval(intervalId);
  }, [initializeAuth, refreshAccessTokenInBackground]);

  const login = (userData: UserResType) => {
    setUser(userData);
    setIsAuthenticated(true);
    setLoading(false);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    setLoading(true);
    await handleLogout();
    router.replace("/login?auth_processed");
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logoutAction();

      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");

      console.log("Logout success");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
