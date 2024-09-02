import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import CircleStyle from "@/components/common/CircleStyle";
import { button, Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import Button from "@/components/common/Button";
import { router } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        ...Styles.container,
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <CircleStyle />
      <View
        style={{
          backgroundColor: Colors.teal_dark,
          borderRadius: 20,
          width: 420,
        }}
      >
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
              marginHorizontal: 20,
            }}
          >
            <Text style={text.h4}>Welcome</Text>
            <Text style={{ ...text.h3, color: Colors.teal_light }}>User</Text>
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
                borderColor: Colors.white,
                borderWidth: 1,
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
                borderColor: Colors.dark,
                borderWidth: 1,
                marginTop: 0,
              }}
              textStyle={{ ...text.p, color: Colors.black }}
            />
          </View>
        </View>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: Colors.teal_light,
            justifyContent: "center",
            alignItems: "center",
            margin: 15,
          }}
        >
          <View
            style={{
              alignSelf: "baseline",
              margin: 20,
              borderColor: Colors.black,
              height: 30,
            }}
          >
            <Text style={{ ...text.p, color: Colors.white }}>
              Continue Learning
            </Text>
          </View>
        </View>
      </View>
      <View style={{ height: 250, backgroundColor: Colors.black }}></View>
    </SafeAreaView>
  );
};

export default Home;
