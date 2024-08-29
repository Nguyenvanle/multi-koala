import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Auth_Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="confirm" options={{ headerShown: false }} />
      <Stack.Screen name="form" options={{ headerShown: false }} />
      <Stack.Screen name="forgot" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Auth_Layout;
