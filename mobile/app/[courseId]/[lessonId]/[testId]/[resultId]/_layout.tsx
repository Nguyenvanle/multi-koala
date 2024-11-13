import { Colors } from "@/constants/Colors";
import { useLessonDetails } from "@/feature/lesson/hooks/useLessonDetails";
import useTestResult from "@/feature/test-result/hooks/useTestResult";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const TestResultLayout = () => {
  const { lessonId } = useGlobalSearchParams();
  const lessonIdString = lessonId as string;
  const [selectedTest, setSelectedTest] = useState(null);
  const { lessonDetails, errorMessageDetails, loadingLessonDetails } =
    useLessonDetails(lessonIdString);

  // Kiểm tra trạng thái loading
  if (loadingLessonDetails) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={Colors.teal_dark} />
      </View>
    );
  }

  // Kiểm tra xem test có thông tin không
  if (!lessonDetails) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: Colors.red }}>No course details available</Text>
      </View>
    );
  }

  const handleBackPress = async () => {
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: lessonDetails.lessonName,
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
