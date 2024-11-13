import { Colors } from "@/constants/Colors";
import { useDetails } from "@/feature/course/hooks/useDetails";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack, useGlobalSearchParams } from "expo-router";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";

const CourseLayout = () => {
  const { courseId } = useGlobalSearchParams();
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;

  const { courseDetails, loading, errorMessageDetails } =
    useDetails(courseIdString);

  // Kiểm tra trạng thái loading
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={Colors.teal_dark} />
      </View>
    );
  }

  // Kiểm tra xem courseDetails có thông tin không
  if (!courseDetails) {
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
          headerTitle: courseDetails.courseName, // Đảm bảo courseDetails đã được khởi tạo
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
            <View style={{ marginBottom: 8, marginRight: 8 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="left" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="[lessonId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default CourseLayout;
