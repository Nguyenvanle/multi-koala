import React from "react";
import { router, Stack } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "My Profile",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.teal_dark,
          },
          headerLeft: () => (
            <View style={{ marginBottom: 8, marginRight: 8 }}>
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

export default ProfileLayout;
