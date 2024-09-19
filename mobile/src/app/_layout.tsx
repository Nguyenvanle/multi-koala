import React from "react";
import { router, Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(intro)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="[courseId]"
        options={{
          headerTitle: "Details",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.teal_dark,
          },
          headerLeft: () => (
            <View style={{ marginBottom: 8 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="left" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default AppLayout;
