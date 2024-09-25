import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import CircleStyle from "../../../components/molecules/front-end/CircleStyle";
import { text } from "@/src/constants/Styles";
import useUser from "@/src/feature/user/hooks/useUser";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import useLogOut from "../../auth/hooks/useLogOut";

const UserAccount = () => {
  const { loading, user, setUser, errorMessage, setErrorMessage } = useUser();
  const { handleLogout } = useLogOut();

  return (
    <ScrollView
      style={{ top: -50, width: 415, paddingTop: 50, paddingHorizontal: 16 }}
    >
      <View
        style={{ alignItems: "center", justifyContent: "center", padding: 16 }}
      >
        <CircleStyle />

        {loading ? (
          <View style={{ paddingTop: 16, justifyContent: "center" }}>
            <ActivityIndicator size={"large"} color={Colors.teal_dark} />
          </View>
        ) : errorMessage ? (
          <Text style={{ color: Colors.red }}>{errorMessage}</Text> // Hiển thị thông báo lỗi
        ) : user ? (
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
              source={{ uri: user.image.imageUrl }}
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 8,
              }}
            ></View>
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
            <Text style={{ ...text.h4, color: Colors.black }}>My Profile</Text>
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
    </ScrollView>
  );
};

export default UserAccount;
