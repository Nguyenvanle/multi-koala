import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import CircleStyle from "./CircleStyle";
import { button, text } from "@/constants/Styles";
import Button from "./Button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";

const HeaderUser: React.FC = () => {
  const { user } = useUser(); // Sử dụng context

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
                marginLeft: 10,
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
                marginLeft: 10,
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
    </View>
  );
};

export default HeaderUser;
