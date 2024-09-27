"use client";
import { logoutService } from "@/features/auth/services/logout";
import { UserResType } from "@/features/users/schema/user";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserResType | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: UserResType) => void;
  logout: () => void;
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

      if (response.code === 200) {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
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
