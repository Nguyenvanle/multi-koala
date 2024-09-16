import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/src/constants/Colors";
import CircleStyle from "../../common/CircleStyle";
import { text } from "@/src/constants/Styles";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_MAIN from "@/src/feature/api/config";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserAccount: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
            process: response.data.result,
            userHometown: response.data.result.userHometown,
            firstlogin: response.data.result.firstlogin,
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
  const handleLogout = async () => {
    try {
      // Xóa token khỏi AsyncStorage
      await AsyncStorage.removeItem("token", response.data.result.token);
      // Xóa dữ liệu người dùng khỏi state
      setUserData(null);
      // Chuyển hướng đến màn hình đăng nhập
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.");
    }
  };
  return (
    <ScrollView
      style={{ top: -50, width: 415, paddingTop: 42, paddingHorizontal: 16 }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <CircleStyle />

        {userData ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
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
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 8,
              }}
            >
              <Image
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 80,
                  backgroundColor: Colors.grey,
                  marginBottom: 8,
                }}
              />
              <Text style={text.h4}>User</Text>
            </View>
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
          >
            <MaterialCommunityIcons
              name="account-circle"
              size={28}
              color={Colors.teal_dark}
              style={{ paddingRight: 24 }}
            />
            <Text style={{ ...text.h4, color: Colors.teal_dark }}>
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
            <Text style={{ ...text.h4, color: Colors.teal_dark }}>
              Password
            </Text>
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
            <Text style={{ ...text.h4, color: Colors.teal_dark }}>
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
            <Text style={{ ...text.h4, color: Colors.teal_dark }}>Support</Text>
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
            <Text style={{ ...text.h4, color: Colors.teal_dark }}>
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
              color={Colors.teal_dark}
              style={{ paddingRight: 24 }}
            />
            <Text style={{ ...text.h4, color: Colors.super_teal_dark }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rest of the component remains the same */}
      </View>
    </ScrollView>
  );
};

export default UserAccount;
