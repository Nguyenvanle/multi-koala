import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/src/constants/Colors";
import CircleStyle from "./CircleStyle";
import { text } from "@/src/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_MAIN from "@/src/feature/api/config";

interface UserData {
  firstname: string;
  lastname: string;
  image: {
    imageUrl: string;
  };
  email: string;
  roles: string;
  userBirth: string;
  token: string;
  userBio: string;
}

const UserAccount: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setErrorMessage("No token found. Please log in.");
          console.error("token not found");
          return;
        }

        const response = await API_MAIN.get("/students/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.result.roles);

        if (response.data.code === 200) {
          setUserData({
            firstname: response.data.result.firstname,
            lastname: response.data.result.lastname,
            image: response.data.result.image,
            email: response.data.result.email,
            roles: response.data.result.roles[0].roleName,
            token: token,
            userBirth: response.data.result.userBirth,
            userBio: response.data.result.userBio,
          });
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);
  const formatBirthDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <ScrollView
      style={{ top: -50, width: 420 }}
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
        {userData ? (
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
              {userData.image && (
                <Image
                  source={{ uri: userData.image.imageUrl }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    marginBottom: 20,
                  }}
                />
              )}
              <Text
                style={{
                  ...text.h3,
                  fontWeight: "500",
                  color: Colors.teal_light,
                }}
              >
                {userData.firstname} {userData.lastname}
              </Text>
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
                        marginHorizontal: 15,
                        backgroundColor: Colors.white,
                        alignItems: "center",
                        borderRadius: 10,
                        padding: 10,
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
                      <Text style={{ ...text.p, fontWeight: "500" }}>
                        {userData.firstname}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        marginHorizontal: 15,
                        alignItems: "center",
                        borderRadius: 10,
                        padding: 10,
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
                      <Text style={{ ...text.p, fontWeight: "500" }}>
                        {userData.lastname}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        marginHorizontal: 15,
                        alignItems: "center",
                        borderRadius: 10,
                        padding: 10,
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
                      <Text style={{ ...text.p, fontWeight: "500" }}>
                        {userData.roles}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      marginBottom: 20,
                    }}
                  >
                    <View
                      style={{
                        width: 350,
                        backgroundColor: Colors.white,
                        alignItems: "center",
                        borderRadius: 10,
                        marginBottom: 20,
                        marginHorizontal: 15,
                        padding: 10,
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
                      <Text style={{ ...text.p, fontWeight: "500" }}>
                        {userData.email}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        marginHorizontal: 15,
                        alignItems: "center",
                        borderRadius: 10,
                        padding: 10,
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
                      <Text style={{ ...text.p, fontWeight: "500" }}>
                        {formatBirthDate(userData.userBirth)}
                      </Text>
                      {/* Hiển thị ngày sinh */}
                    </View>
                  </View>
                  <View
                    style={{
                      width: 350,
                      alignSelf: "center",
                      alignItems: "center",
                      backgroundColor: Colors.white,
                      borderRadius: 10,
                      padding: 10,
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
                    <Text style={{ ...text.p, fontWeight: "500" }}>
                      {userData.userBio}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
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
