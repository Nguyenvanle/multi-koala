import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { Colors } from "@/src/constants/Colors";
import { useLessonDetails } from "@/src/feature/lesson/hooks/useLessonDetails";
import { useTestDetails } from "@/src/feature/test/hooks/useTestDetails";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack, useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const TestResultLayout = () => {
  const handleBackPress = async () => {
    // Xóa AsyncStorage trước khi quay lại
    await AsyncStorage.removeItem("yourKey"); // Thay "yourKey" bằng key mà bạn muốn xóa
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "500",
          },
          headerTintColor: Colors.white,
          headerStyle: {
            backgroundColor: Colors.teal_dark,
          },
          headerLeft: () => (
            <View style={{ marginBottom: 8 }}>
              <TouchableOpacity onPress={handleBackPress}>
                <AntDesign name="left" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default TestResultLayout;
