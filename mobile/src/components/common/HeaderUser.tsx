import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "@/src/constants/Colors";
import CircleStyle from "./CircleStyle";
import { button, text } from "@/src/constants/Styles";
import Button from "./Button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_MAIN from "@/src/feature/api/config";
import { Ionicons } from "@expo/vector-icons";

const HeaderUser: React.FC = () => {
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
        backgroundColor: Colors.teal_dark,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 302,
        width: 420,
        paddingTop: 50,
        paddingBottom: 30,
        top: -50,
        borderWidth: 1,
        borderColor: Colors.grey,
      }}
    >
      <CircleStyle />

      {userData ? (
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            top: -20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text style={text.h4}>Welcome</Text>
            <Text style={{ ...text.h4, color: Colors.teal_light }}>
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
                marginLeft: 180,
              }}
            />
          )}
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 50,
            }}
          >
            <Text style={text.h4}>Welcome</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              paddingHorizontal: 10,
            }}
          >
            <Button
              title="Sign In"
              onPress={() => router.replace("/(auth)/sign-in")}
              buttonStyle={{
                ...button.Authen,
                backgroundColor: Colors.dark,
                width: 100,
                borderRadius: 15,
                marginHorizontal: 5,
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
                borderRadius: 15,
                marginHorizontal: 5,
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
          backgroundColor: Colors.teal_light,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: Colors.dark,
          paddingBottom: 15,
        }}
      >
        <View
          style={{
            alignSelf: "baseline",
            margin: 10,
            marginBottom: 0,
            height: 20,
            marginLeft: 20,
          }}
        >
          <Text style={{ ...text.p, color: Colors.white }}>
            Continue Learning
          </Text>
        </View>
        <View
          style={{
            width: 350,
            backgroundColor: Colors.white,
            height: 1,
            borderRadius: 20,
            marginVertical: 10,
            marginHorizontal: 20,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "baseline",
          }}
        >
          <View style={{ flexDirection: "column", alignSelf: "baseline" }}>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "baseline",
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  ...text.p,
                  color: Colors.teal_dark,
                  marginRight: 67,
                }}
              >
                TOEIC 650+
              </Text>
              <Text
                style={{
                  ...text.small,
                  color: Colors.teal_dark,
                  paddingVertical: 1,
                  marginLeft: 70,
                }}
              >
                10/12
              </Text>
            </View>
            <View
              style={{
                height: 8,
                backgroundColor: Colors.white,
                width: 280,
                borderRadius: 20,
                marginLeft: 20,
                marginTop: 5,
              }}
            />
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={30}
            style={{
              marginHorizontal: 30,
              color: Colors.white,
            }}
          />
        </View>
      </TouchableOpacity>
      {/* Rest of the component remains the same */}
    </View>
  );
};

export default HeaderUser;
