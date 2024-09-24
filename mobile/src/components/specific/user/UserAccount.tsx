import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import CircleStyle from "../../common/CircleStyle";
import { text } from "@/src/constants/Styles";
import { router } from "expo-router";
import useUser from "@/src/feature/auth/hooks/useUser";

const UserAccount: React.FC = () => {
  const { loading, user, setUser, errorMessage, setErrorMessage } = useUser();
  const getToken = user?.token;

  return (
    <ScrollView
      style={{ top: -50, width: 415, paddingTop: 50, paddingHorizontal: 16 }}
    >
      <View
        style={{ alignItems: "center", justifyContent: "center", padding: 16 }}
      >
        <CircleStyle />

        {loading ? (
          <Text>Loading...</Text> // Hiển thị loading khi đang tải
        ) : errorMessage ? (
          <Text style={{ color: Colors.red }}>{errorMessage}</Text> // Hiển thị thông báo lỗi
        ) : user ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
          >
            <Image
              style={{
                width: 160,
                height: 160,
                borderRadius: 80,
                marginBottom: 8,
              }}
              source={{ uri: user.image.imageUrl }}
            />
            <Text style={{ ...text.h3, color: Colors.teal_dark }}>
              {user.firstname} {user.lastname}
            </Text>
          </View>
        ) : (
          <Text>User not found.</Text>
        )}

        {/* Các mục khác của component vẫn giữ nguyên */}
        <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")}>
          <Text style={{ ...text.h4, color: Colors.red }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserAccount;
