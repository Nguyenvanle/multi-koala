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
import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";
import { useCourse } from "../../../hooks/useCourse";
import useUser from "@/feature/user/hooks/useUser";
import { useEnrolled } from "../../../hooks/useEnrrolled";
import { CourseBody } from "../../../types/course";

interface Filter {
  types: string[];
  fields: string[];
}

interface AllCoursesProps {
  searchQuery: string;
  filter: Filter;
}

const AllCourses: React.FC<AllCoursesProps> = ({
  searchQuery = "", // Default value
  filter,
}) => {
  // Giả định bạn có course data
  const { courseId } = useGlobalSearchParams();
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const { course, errorMessage, loading } = useCourse();
  const { user } = useUser();
  const { enrolled } = useEnrolled();

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator color={Colors.teal_dark} />
      </View>
    );
  }

  // Lọc danh sách khóa học đã đăng ký
  const enrolledCourseIds = Array.isArray(enrolled)
    ? enrolled.map((enrolledCourse) => enrolledCourse.course.courseId)
    : [];

  const filteredCourses = course.filter((item: CourseBody) => {
    if (!item?.courseName) return false;

    const matchesSearch = item.courseName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Lọc theo loại và trường
    const matchesType =
      filter.types.length === 0 ||
      filter.types.every((type) =>
        item.types.some((courseType) => courseType.typeName === type)
      );

    const matchesField =
      filter.fields.length === 0 ||
      filter.fields.every((field) =>
        item.fields.some((itemField) => itemField.fieldName === field)
      );

    return matchesSearch && matchesType && matchesField; // Đã bỏ qua notEnrolled
  });

  const renderCourseItem = ({ item }: { item: CourseBody }) => {
    const isEnrolled = enrolledCourseIds.includes(item.courseId); // Kiểm tra khóa học đã đăng ký

    return (
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
        {!isEnrolled ? ( // Hiển thị nút "Buy Now" nếu chưa đăng ký
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
                  "You need to LogIn to enroll this course.",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Log In",
                      onPress: () => router.push("/(auth)/sign-in"),
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
              Enroll Now
            </Text>
          </TouchableOpacity>
        ) : (
          // Hiển thị nút "Continue" nếu đã đăng ký
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
            onPress={() => router.push(`/${item.courseId}`)} // Chuyển hướng đến khóa học
          >
            <Text
              style={{
                ...text.h4,
                fontWeight: "500",
                color: Colors.white,
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{ paddingVertical: 10 }}>
      {user ? (
        <View style={{ marginBottom: 50 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredCourses}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.courseId}
            ListEmptyComponent={
              <Text
                style={{
                  ...text.large,
                  marginTop: 8,
                  fontWeight: "400",
                  color: Colors.dark_grey,
                }}
              >
                No courses available
              </Text>
            }
          />
        </View>
      ) : (
        <View style={{ height: 700, top: -10 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={course}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.courseId}
            ListEmptyComponent={<Text>No courses available</Text>}
            style={{ marginBottom: 40 }}
          />
        </View>
      )}
    </View>
  );
};

export default AllCourses;
