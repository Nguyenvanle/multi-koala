import { Colors } from "@/src/constants/Colors";
import { useLessonDetails } from "@/src/feature/lesson/hooks/useLessonDetails";
import { useTestDetails } from "@/src/feature/test/hooks/useTestDetails";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack, useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const TestLayout = () => {
  const { lessonId } = useGlobalSearchParams();
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const { testDetails, errorMessageTest, loadingTest } =
    useTestDetails(lessonIdString);
  const { lessonDetails, errorMessageDetails, loadingLessonDetails } =
    useLessonDetails(lessonIdString);

  // Kiểm tra trạng thái loading
  if (loadingLessonDetails) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.teal_dark} />
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
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="left" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
};
export default TestLayout;
