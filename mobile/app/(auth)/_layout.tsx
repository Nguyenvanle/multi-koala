import React from "react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const Auth_Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen
        name="confirm"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen name="form" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgot"
        options={{
          presentation: "formSheet",
          headerShown: false,
          contentStyle: styles.modalContent, // Thêm style cho modal
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Auth_Layout;
