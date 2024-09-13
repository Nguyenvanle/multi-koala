import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const NewCoures = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-evenly",
        top: -30,
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          width: 400,
          height: 110,
          backgroundColor: Colors.white,
          flexDirection: "row",
          borderRadius: 15,
          paddingHorizontal: 10,
          shadowColor: Colors.grey,
          shadowOpacity: 1,
        }}
      >
        <Image
          source={require("@/src/assets/images/Toeic.png")}
          style={{
            width: 120,
            height: 100,
            borderRadius: 20,
            marginVertical: 5,
            borderColor: Colors.grey,
            borderWidth: 1,
          }}
        />
        <View style={{ flexDirection: "column", paddingHorizontal: 30 }}>
          <Text style={{ ...text.p, fontWeight: "500", paddingBottom: 10 }}>
            Toeic 650+
          </Text>
          <View style={{ flexDirection: "row", paddingBottom: 10 }}>
            <Text
              style={{
                ...text.small,
                paddingRight: 10,
                color: Colors.grey,
              }}
            >
              1h 50m
            </Text>
            <Text
              style={{ ...text.small, paddingLeft: 10, color: Colors.grey }}
            >
              12 lessons
            </Text>
          </View>
          <Text style={{ ...text.large, color: Colors.red, fontWeight: "500" }}>
            Free
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          width: 400,
          height: 110,
          backgroundColor: Colors.white,
          flexDirection: "row",
          borderRadius: 15,
          paddingHorizontal: 10,
          marginVertical: 10,
          shadowColor: Colors.grey,
          shadowOpacity: 1,
        }}
      >
        <Image
          source={require("@/src/assets/images/Toeic.png")}
          style={{
            width: 120,
            height: 100,
            borderRadius: 20,
            marginVertical: 5,
            borderColor: Colors.grey,
            borderWidth: 1,
          }}
        />
        <View style={{ flexDirection: "column", paddingHorizontal: 30 }}>
          <Text style={{ ...text.p, fontWeight: "500", paddingBottom: 10 }}>
            Toeic 650+
          </Text>
          <View style={{ flexDirection: "row", paddingBottom: 10 }}>
            <Text
              style={{
                ...text.small,
                paddingRight: 10,
                color: Colors.grey,
              }}
            >
              1h 50m
            </Text>
            <Text
              style={{ ...text.small, paddingLeft: 10, color: Colors.grey }}
            >
              12 lessons
            </Text>
          </View>
          <Text style={{ ...text.large, color: Colors.red, fontWeight: "500" }}>
            Free
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default NewCoures;
