import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useCourse } from "../../../hooks/useCourse";
import useUser from "@/src/feature/user/hooks/useUser";
import { CourseBody } from "../../../types/course";
import { useEnrolled } from "../../../hooks/useEnrrolled";

interface AllCoursesProps {
  searchQuery: string;
}

const AllCourses: React.FC<AllCoursesProps> = ({ searchQuery }) => {
  const { courseId } = useGlobalSearchParams();
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const { course, errorMessage, loading } = useCourse();
  const { user } = useUser();
  const { enrolled } = useEnrolled();

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  // Lọc danh sách khóa học đã đăng ký
  const enrolledCourseIds = Array.isArray(enrolled)
    ? enrolled.map((enrolledCourse) => enrolledCourse.course.courseId)
    : [];

  const filteredCourses = course.filter((item: CourseBody) => {
    const matchesSearch = item.courseName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const notEnrolled = !enrolledCourseIds.includes(item.courseId);
    return matchesSearch && notEnrolled;
  });

  const renderCourseItem = ({ item }: { item: CourseBody }) => (
    <View>
      <Link href={`/${item.courseId}`} asChild>
        <TouchableOpacity style={{ marginTop: 16 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 350,
            }}
          >
            <Image
              source={{ uri: item.image.imageUrl }}
              style={{
                width: 350,
                height: 200,
                borderRadius: 15,
                borderColor: Colors.grey,
                borderWidth: 1,
              }}
            />
            <View
              style={{
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "baseline",
                  width: 345,

                  paddingTop: 8,
                  paddingBottom: 0,
                }}
              >
                <Text
                  style={{
                    ...text.h4,
                    color: Colors.black,
                    fontWeight: "400",
                  }}
                >
                  {item.courseName}
                </Text>
              </View>
              <View style={{ marginVertical: 5, paddingTop: 0 }}>
                <Text
                  style={{
                    ...text.large,
                    fontWeight: "400",
                    color: Colors.teal_dark,
                  }}
                >
                  {item.uploadedByTeacher.firstname}{" "}
                  {item.uploadedByTeacher.lastname}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity
        style={{
          borderRadius: 10,
          backgroundColor: Colors.teal_dark,
          alignItems: "center",
          height: 50,
          width: 350,
          marginTop: 8,
          marginBottom: 8,
          justifyContent: "center",
        }}
        onPress={() => {
          if (user) {
            router.push(`/${item.courseId}`);
          } else {
            Alert.alert(
              "LogIn Required",
              "You need to LogIn to buy this course.",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Log In",
                  onPress: () => router.push("/(auth)/sign-in"), // Assuming you have a login route
                },
              ]
            );
          }
        }}
      >
        <Text
          style={{
            ...text.h4,
            fontWeight: "500",
            color: Colors.white,
          }}
        >
          Buy Now
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      {user ? (
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredCourses} // Sử dụng danh sách đã lọc
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.courseId}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 0,
            paddingVertical: 10,
            height: 700,
            top: -160,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={course}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.courseId}
            style={{ height: 630 }}
          />
        </View>
      )}
    </View>
  );
};

export default AllCourses;
