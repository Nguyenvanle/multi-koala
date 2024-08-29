import { View, Text, SafeAreaView, StatusBar, TextInput } from "react-native";
import React, { useState } from "react";
import { Styles, text } from "@/constants/Styles";
import CircleStyle from "@/components/common/CircleStyle";
import { Colors } from "@/constants/Colors";
import { styles } from "./sign-in";

const Forgot = () => {
  const [username, setUsername] = useState("");

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <Text
        style={{
          ...text.h2,
          fontWeight: "bold",
          color: Colors.teal_dark,
          paddingTop: 20,
          paddingHorizontal: 20,
          height: 120,
        }}
      >
        Forgot Password
      </Text>
      <View
        style={{
          marginHorizontal: 35,
          alignSelf: "flex-start",
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            ...text.h4,
            color: Colors.teal_dark,
            alignSelf: "center",
            paddingVertical: 50,
            fontWeight: "500",
          }}
        >
          Please enter your username
        </Text>
        <View
          style={{
            marginHorizontal: 10,
            alignSelf: "flex-start",
            paddingTop: 10,
          }}
        >
          <Text style={{ ...text.p, fontWeight: "500" }}>Username</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={Colors.grey}
          value={username}
          onChangeText={setUsername}
        />
      </View>
    </SafeAreaView>
  );
};

export default Forgot;
