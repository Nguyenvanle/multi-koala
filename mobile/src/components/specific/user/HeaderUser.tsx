import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "@/src/constants/Colors";
import CircleStyle from "../../common/CircleStyle";
import { button, text } from "@/src/constants/Styles";
import Button from "../../common/Button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_MAIN from "@/src/feature/api/config";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import Feather from "@expo/vector-icons/Feather";

const HeaderUser: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [progressCourses, setProgressCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setErrorMessage("No token found. Please log in.");
          return;
        }

        const response = await API_MAIN.get("/students/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        padding: 16,
      }}
    >
      <CircleStyle />

      {userData ? (
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            padding: 8,
            width: 364,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "baseline",
              flexDirection: "column",
            }}
          >
            <Text style={text.h4}>Welcome</Text>
            <Text style={{ ...text.h4, color: Colors.teal_dark }}>
              {userData.firstname} {userData.lastname}
            </Text>
          </View>
          {userData.image && (
            <Image
              source={{ uri: userData.image.imageUrl }}
              style={{
                width: 75,
                height: 75,
                borderRadius: 35,
                justifyContent: "flex-end",
              }}
            />
          )}
        </View>
      ) : (
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            padding: 8,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "baseline",
              flexDirection: "column",
              padding: 8,
            }}
          >
            <Text style={text.h4}>Welcome</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              paddingLeft: 52,
            }}
          >
            <Button
              title="Sign In"
              onPress={() => router.replace("/(auth)/sign-in")}
              buttonStyle={{
                ...button.Authen,
                backgroundColor: Colors.dark,
                width: 100,
                borderRadius: 10,
                marginTop: 0,
              }}
              textStyle={{ ...text.p, color: Colors.white }}
            />
            <Button
              title="Sign Up"
              onPress={() => router.replace("/(auth)/sign-up")}
              buttonStyle={{
                ...button.Authen,
                backgroundColor: Colors.white,
                width: 100,
                borderRadius: 10,
                marginHorizontal: 8,
                marginTop: 0,
              }}
              textStyle={{ ...text.p, color: Colors.black }}
            />
          </View>
        </View>
      )}
      <TouchableOpacity
        style={{
          borderRadius: 10,
          backgroundColor: Colors.teal_dark,
          justifyContent: "space-between",
          padding: 16,
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignSelf: "baseline",
          }}
        >
          <Text style={{ ...text.h4, color: Colors.white }}>
            Continue Learning
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "baseline",
            paddingVertical: 8,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              paddingRight: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  ...text.p,
                  color: Colors.background,
                }}
              >
                Toeic 650+
              </Text>
              <Text
                style={{
                  ...text.small,
                  color: Colors.background,
                  paddingLeft: 150,
                }}
              >
                10/12
              </Text>
            </View>
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 20,
              }}
            >
              <Progress.Bar
                width={280}
                progress={0.8}
                color={Colors.teal_light}
              />
            </View>
          </View>
          <Feather
            name="arrow-right-circle"
            size={32}
            color={Colors.background}
            style={{ alignSelf: "flex-end" }}
          />
        </View>
      </TouchableOpacity>
      {/* Rest of the component remains the same */}
    </View>
  );
};

export default HeaderUser;
