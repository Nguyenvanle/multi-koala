import React from "react";
import { Stack } from "expo-router";

const AccountLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="account" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AccountLayout;
