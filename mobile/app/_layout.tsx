import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "@/context/UserContext";

const AppLayout = () => {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="(intro)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
};

export default AppLayout;
