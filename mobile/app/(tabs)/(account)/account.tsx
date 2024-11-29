import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { Styles, text } from "@/constants/Styles";
import useUser from "@/feature/user/hooks/useUser";
import CircleStyle from "@/components/molecules/front-end/CircleStyle";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { UserContext } from "@/context/user/userContext";
import { useLogOut } from "@/feature/auth/hooks/useLogOut";

const Account = () => {
  const { user } = useContext(UserContext); // Sử dụng UserContext

  const {
    loadingUser,
    isRefreshing,
    setUser,
    errorMessage,
    setErrorMessage,
    refreshUser,
  } = useUser();

  const { handleLogout } = useLogOut();

  return (
    <SafeAreaView
      style={{
        ...Styles.container,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <View
        style={{
          top: -57.4,
          width: 415,
          paddingTop: 50,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <CircleStyle />

          {loadingUser ? (
            <View style={{ paddingTop: 16, justifyContent: "center" }}>
              <ActivityIndicator color={Colors.teal_dark} />
            </View>
          ) : errorMessage ? (
            <Text style={{ color: Colors.red }}>{errorMessage}</Text> // Hiển thị thông báo lỗi
          ) : user && user.image !== null ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
              }}
            >
              <Image
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 80,
                  marginBottom: 8,
                }}
                source={{ uri: user?.image?.imageUrl }}
              />
              <Text style={{ ...text.h3, color: Colors.teal_dark }}>
                {user.firstname} {user.lastname}
              </Text>
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
              }}
            >
              <Image
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 80,
                  marginBottom: 8,
                }}
                source={require("@/assets/images/koala.png")}
              />
              <Text style={{ ...text.h3, color: Colors.teal_dark }}>
                {user.firstname} {user.lastname}
              </Text>
            </View>
          )}

          <View style={{ alignSelf: "baseline", paddingBottom: 8 }}>
            <Text style={{ ...text.h3 }}>Account</Text>
          </View>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: Colors.white,
              justifyContent: "space-between",
              padding: 16,
              width: 350,
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingBottom: 24,
                width: 300,
              }}
              onPress={() => router.push("/(myProfile)/")}
            >
              <MaterialCommunityIcons
                name="account-circle"
                size={28}
                color={Colors.teal_dark}
                style={{ paddingRight: 24 }}
              />
              <Text style={{ ...text.h4, color: Colors.black }}>
                My Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: "row", width: 300 }}>
              <AntDesign
                name="eye"
                size={28}
                color={Colors.teal_dark}
                style={{ paddingRight: 24 }}
              />
              <Text style={{ ...text.h4, color: Colors.black }}>Password</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ alignSelf: "baseline", paddingBottom: 8, paddingTop: 16 }}
          >
            <Text style={{ ...text.h3 }}>Support & About</Text>
          </View>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: Colors.white,
              justifyContent: "space-between",
              padding: 16,
              width: 350,
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", width: 300, paddingBottom: 24 }}
            >
              <Ionicons
                name="information-circle"
                size={28}
                color={Colors.teal_dark}
                style={{ paddingRight: 24 }}
              />
              <Text style={{ ...text.h4, color: Colors.black }}>
                Terms & Policies
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row", width: 300 }}>
              <MaterialIcons
                name="support-agent"
                size={28}
                color={Colors.teal_dark}
                style={{ paddingRight: 24 }}
              />
              <Text style={{ ...text.h4, color: Colors.black }}>Support</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ alignSelf: "baseline", paddingBottom: 8, paddingTop: 16 }}
          >
            <Text style={{ ...text.h3 }}>Services</Text>
          </View>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: Colors.white,
              justifyContent: "space-between",
              padding: 16,
              width: 350,
              alignSelf: "center",
            }}
          >
            <TouchableOpacity style={{ flexDirection: "row", width: 300 }}>
              <FontAwesome
                name="bank"
                size={24}
                color={Colors.teal_dark}
                style={{ paddingRight: 24 }}
              />
              <Text style={{ ...text.h4, color: Colors.black }}>
                Bank Account
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: Colors.white,
              justifyContent: "space-between",
              padding: 16,
              width: 350,
              alignSelf: "center",
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={handleLogout}
            >
              <MaterialCommunityIcons
                name="logout"
                size={28}
                color={Colors.red}
                style={{ paddingRight: 24 }}
              />
              <Text style={{ ...text.h4, color: Colors.red }}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;
