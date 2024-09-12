import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import CircleStyle from "./CircleStyle";
import { text } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";
import { router } from "expo-router";

const UserAccount: React.FC = () => {
  const { user } = useUser(); // Sử dụng context

  return (
    <ScrollView
      style={{ top: -50, width: 420, marginBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          backgroundColor: Colors.teal_dark,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          width: 420,
          paddingTop: 50,
          paddingBottom: 10,
          borderWidth: 1,
          borderColor: Colors.grey,
        }}
      >
        <CircleStyle />

        {user ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={text.h4}>Welcome</Text>
            <Text style={{ ...text.h3, color: Colors.teal_light }}>
              {user.firstname} {user.lastname}
            </Text>
          </View>
        ) : (
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 50,
              }}
            >
              <View
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  backgroundColor: Colors.grey,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <Text style={{ ...text.large, fontWeight: "500" }}>Image</Text>
              </View>
              <Text style={{ ...text.h4, fontWeight: "500" }}>User</Text>
              <TouchableOpacity
                style={{ marginTop: 5, marginBottom: 20, flexDirection: "row" }}
              >
                <Text style={{ ...text.small, color: Colors.white }}>
                  edit profile
                </Text>
                <Ionicons
                  name="information-circle-outline"
                  size={17}
                  style={{ color: Colors.white }}
                />
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: "center",
                  paddingVertical: 10,
                  alignItems: "center",
                  marginLeft: 12,
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignSelf: "center",
                      paddingBottom: 20,
                    }}
                  >
                    <View
                      style={{
                        width: 100,
                        height: 60,
                        marginHorizontal: 14,
                        backgroundColor: Colors.white,
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          ...text.blackquote,
                          color: Colors.teal_dark,
                          marginBottom: 10,
                        }}
                      >
                        Firstname
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 100,
                        height: 60,
                        backgroundColor: Colors.white,
                        marginHorizontal: 14,
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          ...text.blackquote,
                          color: Colors.teal_dark,
                          marginBottom: 10,
                        }}
                      >
                        Lastname
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 100,
                        height: 60,
                        backgroundColor: Colors.white,
                        marginHorizontal: 14,
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          ...text.blackquote,
                          color: Colors.teal_dark,
                          marginBottom: 10,
                        }}
                      >
                        Role
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignSelf: "center",
                      marginBottom: 20,
                    }}
                  >
                    <View
                      style={{
                        width: 230,
                        height: 60,
                        marginHorizontal: 14,
                        backgroundColor: Colors.white,
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          ...text.blackquote,
                          color: Colors.teal_dark,
                          marginBottom: 10,
                        }}
                      >
                        Email
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 100,
                        height: 60,
                        backgroundColor: Colors.white,
                        marginHorizontal: 14,
                        alignItems: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          ...text.blackquote,
                          color: Colors.teal_dark,
                          marginBottom: 10,
                        }}
                      >
                        Birthday
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignSelf: "baseline",
                      width: 359,
                      height: 208,
                      backgroundColor: Colors.white,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        ...text.blackquote,
                        color: Colors.teal_dark,
                        marginBottom: 10,
                        paddingHorizontal: 10,
                      }}
                    >
                      Introduction
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <TouchableOpacity
          style={{
            width: 380,
            height: 60,
            backgroundColor: Colors.teal_light,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginVertical: 5,
          }}
        >
          <Text
            style={{ ...text.large, color: Colors.white, fontWeight: "500" }}
          >
            Bank Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 380,
            height: 60,
            backgroundColor: Colors.teal_dark,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginVertical: 5,
          }}
          onPress={() => router.replace("/(auth)/sign-in")}
        >
          <Text
            style={{ ...text.large, color: Colors.white, fontWeight: "500" }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserAccount;
