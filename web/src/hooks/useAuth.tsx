import { User } from "@/types/account/user";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser({
      id: "123",
      firstName: "John",
      lastName: "Doe",
      userBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      homeTown: "New York",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/2565/2565060.png",
    });
  }, []);

  return { user };
};
