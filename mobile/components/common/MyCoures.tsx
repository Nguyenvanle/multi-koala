import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";

const MyCoures = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginRight: 14,
          shadowColor: Colors.grey,
          shadowOpacity: 1,
        }}
      >
        <Image
          source={require("@/assets/images/Toeic.png")}
          style={{
            width: 190,
            height: 150,
            borderRadius: 20,
            marginVertical: 5,
            borderColor: Colors.grey,
            borderWidth: 1,
          }}
        />
        <Text style={{ ...text.p, color: Colors.black }}>Toeic 650+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginRight: 14,
          shadowColor: Colors.grey,
          shadowOpacity: 1,
        }}
      >
        <Image
          source={require("@/assets/images/Toeic.png")}
          style={{
            width: 190,
            height: 150,
            borderRadius: 20,
            marginVertical: 5,
            borderColor: Colors.grey,
            borderWidth: 1,
          }}
        />
        <Text style={{ ...text.p, color: Colors.black }}>Toeic 650+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyCoures;
