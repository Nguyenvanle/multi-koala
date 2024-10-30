import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { Link } from "expo-router";
import { useCourse } from "../../../hooks/useCourse";
import useUser from "@/src/feature/user/hooks/useUser";
import { CourseBody } from "../../../types/course";
import { useEnrolled } from "../../../hooks/useEnrrolled";

const NewCourses = () => {
  const { course, loading, errorMessage } = useCourse();
  const { user } = useUser();
  const { enrolled } = useEnrolled();

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }
  if (errorMessage) {
    return (
      <Text style={{ ...text.large, color: Colors.red, fontWeight: "400" }}>
        {errorMessage}
      </Text>
    );
  }

  const getFilteredCourses = (courses, enrolled, user) => {
    // Lọc danh sách khóa học để loại bỏ những khóa học đã được đăng ký
    const enrolledCourseIds = Array.isArray(enrolled)
      ? enrolled.map((enrolledCourse) => enrolledCourse.course.courseId)
      : [];

    const filteredCourses = courses.filter((item) => {
      return !enrolledCourseIds.includes(item.courseId);
    });

    // Số lượng khóa học hiển thị dựa trên việc người dùng có tồn tại hay không
    const numberOfCoursesToShow = user ? 10 : 5; // Nếu có người dùng, hiển thị 10 khóa học, ngược lại hiển thị 5 khóa học

    // Lấy khóa học theo số lượng đã xác định
    return filteredCourses.slice(0, numberOfCoursesToShow);
  };
  // Gọi hàm getFilteredCourses với các tham số
  const coursesToShow = getFilteredCourses(course, enrolled, user);

  const renderCourseItem = ({ item }: { item: CourseBody }) => (
    <View style={styles.container}>
      <Link href={`/${item.courseId}`} asChild>
        <TouchableOpacity style={styles.courseContainer}>
          <Image
            source={{ uri: item.image.imageUrl }}
            style={styles.courseImage}
          />
          <View style={styles.containerText}>
            <Text style={styles.clampedText} numberOfLines={2}>
              {item.courseName}
            </Text>
            <View style={{ paddingTop: 8 }}>
              <Text style={styles.priceText}>Buy Now</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );

  return (
    <View>
      {user ? (
        <View style={{ height: 230 }}>
          <FlatList
            data={coursesToShow}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.courseId}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={{ height: 450, top: -195 }}>
          <FlatList
            data={coursesToShow}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.courseId}
            showsVerticalScrollIndicator={false}
            style={{ minHeight: 640 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Các style đã được giữ nguyên
  price: {
    ...text.large,
    color: Colors.teal_dark,
    fontWeight: "300",
    paddingTop: 8,
  },
  courseContainer: {
    justifyContent: "flex-start",
    backgroundColor: Colors.white,
    flexDirection: "row",
    width: 350,
    borderRadius: 15,
    padding: 8,
    marginBottom: 16,
  },
  courseImage: {
    width: 110,
    height: 100,
    borderRadius: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  container: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  containerText: {
    overflow: "hidden",
    width: 170,
    padding: 8,
  },
  clampedText: {
    ...text.large,
    color: Colors.black,
    fontWeight: "400",
  },
  priceText: {
    ...text.p,
    color: Colors.teal_dark,
    fontWeight: "400",
  },
  duration: {
    ...text.small,
    color: Colors.dark_grey,
  },
  image: {
    width: 170,
    height: 140,
    borderRadius: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});

export default NewCourses;
