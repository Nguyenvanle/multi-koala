import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { Colors } from "@/constants/Colors";
import { useLessonDetails } from "@/feature/lesson/hooks/useLessonDetails";
import { useTestDetails } from "@/feature/test/hooks/useTestDetails";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack, useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const TestLayout = () => {
  const { lessonId, testId } = useGlobalSearchParams();
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const testIdString = Array.isArray(testId) ? testId[0] : testId;
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
      <Stack.Screen
        name="[resultId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default TestLayout;
