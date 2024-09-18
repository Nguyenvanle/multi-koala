import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useCourses } from "@/src/hook/course/useCourse";

const NewCourses = () => {
  const { courseData, loading, errorMessage } = useCourses();

  if (loading) {
    return (
      <Text style={{ ...text.p, color: Colors.teal_dark, paddingVertical: 10 }}>
        Loading...
      </Text>
    );
  }
  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  // Lấy 5 khóa học đầu tiên từ courseData
  const limitedCourses = courseData.slice(0, 5);

  const renderCourseItem = ({ item }: { item: CourseData }) => (
    <View style={styles.container}>
      <TouchableOpacity style={styles.courseContainer}>
        <Image
          source={{ uri: item.image.imageUrl }}
          style={styles.courseImage}
        />
        <View style={styles.containerText}>
          <Text style={styles.clampedText} numberOfLines={1}>
            {item.courseName}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 130,
              paddingVertical: 8,
            }}
          >
            <Text style={styles.duration}>1h 23m</Text>
            <Text style={styles.duration}>12 lessons</Text>
          </View>
          <View style={{ paddingTop: 8 }}>
            <Text style={styles.priceText}>${item.coursePrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ height: 240, top: -24 }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : errorMessage ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={limitedCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.courseId}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
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
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingTop: 8,
  },
  containerText: {
    overflow: "hidden",
    width: 170,
    padding: 8,
  },
  clampedText: {
    // Styles can be adjusted according to your needs
    ...text.p,
    color: Colors.black,
    fontWeight: "400",
  },
  priceText: {
    ...text.p,
    color: Colors.teal_dark, // Có thể thay đổi màu sắc theo ý thích
    fontWeight: "300",
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
