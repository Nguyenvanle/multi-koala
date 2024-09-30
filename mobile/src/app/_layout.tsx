import { Stack } from "expo-router";
import React from "react";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(intro)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="[courseId]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
