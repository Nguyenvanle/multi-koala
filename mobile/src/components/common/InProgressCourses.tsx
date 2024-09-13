import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";

const InProgressCourses = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        paddingVertical: 10,
        marginBottom: 200,
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          shadowColor: Colors.grey,
          shadowOpacity: 1,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("@/src/assets/images/Toeic.png")}
          style={{
            width: 380,
            height: 200,
            borderRadius: 20,
            marginVertical: 5,
            borderColor: Colors.grey,
            borderWidth: 1,
          }}
        />
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
                color: Colors.black,
                marginRight: 67,
              }}
            >
              Ielts 8.0
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...text.small, marginLeft: 10, color: Colors.grey }}>
              1h 50m
            </Text>
            <Text style={{ ...text.small, marginLeft: 10, color: Colors.grey }}>
              12 lessons
            </Text>
            <Text
              style={{
                ...text.small,
                color: Colors.teal_dark,
                marginLeft: 190,
              }}
            >
              10/12
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: Colors.white,
              width: 360,
              borderRadius: 20,
              marginLeft: 10,
              marginTop: 5,
            }}
          />
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Text
              style={{
                ...text.subtitle,
                marginLeft: 10,
                marginTop: 5,
                color: Colors.teal_dark,
              }}
            >
              Lê Dương Anh Tú
            </Text>
            <Text
              style={{
                ...text.large,
                fontWeight: "500",
                color: Colors.red,
                marginLeft: 210,
              }}
            >
              Free
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          shadowColor: Colors.grey,
          shadowOpacity: 1,
        }}
      >
        <Image
          source={require("@/src/assets/images/Toeic.png")}
          style={{
            width: 380,
            height: 200,
            borderRadius: 20,
            marginVertical: 5,
            borderColor: Colors.grey,
            borderWidth: 1,
          }}
        />
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
                color: Colors.black,
                marginRight: 67,
              }}
            >
              TOEIC 650+
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...text.small, marginLeft: 10, color: Colors.grey }}>
              1h 50m
            </Text>
            <Text style={{ ...text.small, marginLeft: 10, color: Colors.grey }}>
              12 lessons
            </Text>
            <Text
              style={{
                ...text.small,
                color: Colors.teal_dark,
                marginLeft: 190,
              }}
            >
              10/12
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: Colors.white,
              width: 360,
              borderRadius: 20,
              marginLeft: 10,
              marginTop: 5,
            }}
          />
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Text
              style={{
                ...text.subtitle,
                marginLeft: 10,
                marginTop: 5,
                color: Colors.teal_dark,
              }}
            >
              Lê Dương Anh Tú
            </Text>
            <Text
              style={{
                ...text.large,
                fontWeight: "500",
                color: Colors.red,
                marginLeft: 210,
              }}
            >
              Free
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          shadowColor: Colors.grey,
          shadowOpacity: 1,
        }}
      >
        <Image
          source={require("@/src/assets/images/Toeic.png")}
          style={{
            width: 380,
            height: 200,
            borderRadius: 20,
            marginVertical: 5,
            borderColor: Colors.grey,
            borderWidth: 1,
          }}
        />
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
                color: Colors.black,
                marginRight: 67,
              }}
            >
              TOEIC 650+
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...text.small, marginLeft: 10, color: Colors.grey }}>
              1h 50m
            </Text>
            <Text style={{ ...text.small, marginLeft: 10, color: Colors.grey }}>
              12 lessons
            </Text>
            <Text
              style={{
                ...text.small,
                color: Colors.teal_dark,
                marginLeft: 190,
              }}
            >
              10/12
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: Colors.white,
              width: 360,
              borderRadius: 20,
              marginLeft: 10,
              marginTop: 5,
            }}
          />
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <Text
              style={{
                ...text.subtitle,
                marginLeft: 10,
                marginTop: 5,
                color: Colors.teal_dark,
              }}
            >
              Lê Dương Anh Tú
            </Text>
            <Text
              style={{
                ...text.large,
                fontWeight: "500",
                color: Colors.red,
                marginLeft: 210,
              }}
            >
              Free
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InProgressCourses;
