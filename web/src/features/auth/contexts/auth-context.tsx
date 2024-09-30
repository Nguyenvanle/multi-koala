"use client";
import { toast } from "@/components/ui/use-toast";
import { logoutService } from "@/features/auth/services/logout";
import { UserResType } from "@/features/users/schema/user";
import { DURATION } from "@/types/layout/toast";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserResType | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: UserResType) => void;
  logout: () => Promise<{
    code: number;
    message: string;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserResType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (userData: UserResType) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    setLoading(false);
  };

  const logout = async () => {
    try {
      const response = await logoutService.nextLogout();

      if (response.code === 401) {
        toast({
          title: "Session Expired",
          description: "Your session has expired, please log in again.",
          variant: "destructive",
          duration: 3000,
        });
      }

      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      return response;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setLoading(false);
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
