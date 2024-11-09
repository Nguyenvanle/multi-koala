import { Stack } from "expo-router";
import React from "react";
import UserProvider from "../context/user/userContext";

const AppLayout = () => {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="(intro)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="[courseId]" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
};

export default AppLayout;
