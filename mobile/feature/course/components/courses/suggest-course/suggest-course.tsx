import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";
import { useSuggestCourse } from "@/feature/course/hooks/useSuggestCourse";
import { CourseBody } from "@/feature/course/types/suggest-course";
import { Link, router, useGlobalSearchParams } from "expo-router";
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const SuggestCourse = () => {
  const { courseId } = useGlobalSearchParams();
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const { suggestCourse, loading, error } = useSuggestCourse(courseIdString);

  // CourseCard Component
  const CourseCard = ({ item }: { item: CourseBody }) => {
    // Xác định màu sắc cho courseLevel
    let courseLevelColor = Colors.black; // Mặc định là màu đen
    if (item.courseLevel === "BEGINNER") {
      courseLevelColor = "#0d9488"; // Màu xanh lá
    } else if (item.courseLevel === "INTERMEDIATE") {
      courseLevelColor = "#eab308"; // Màu vàng
    } else if (item.courseLevel === "ADVANCED") {
      courseLevelColor = "#f97316"; // Màu cam
    } else if (item.courseLevel === "EXPERT") {
      courseLevelColor = "#ef4444"; // Màu đỏ
    }
    return (
      <Link style={styles.card} href={`/${item.courseId}`}>
        <Image
          source={{
            uri:
              item.image.imageUrl ||
              "https://img.freepik.com/free-vector/faqs-concept-illustration_114360-5215.jpg?t=st=1732892833~exp=1732896433~hmac=f12b1f3fbbb20b6e374e81fb1d3283827dcf73904ef5d6c29434936df1b0432b&w=826",
          }} // Đảm bảo cung cấp URI hợp lệ cho thumbnail
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.courseTitle}>{item.courseName}</Text>
          <Text style={styles.courseDescription}>{item.courseDescription}</Text>

          <View style={styles.instructorContainer}>
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>
                {item.uploadedByTeacher.firstname}{" "}
                {item.uploadedByTeacher.lastname}
              </Text>
            </View>
          </View>

          <View style={styles.courseInfo}>
            <View style={styles.infoItem}>
              <Icon name="book-open" size={16} color="#666" />
              <Text style={[styles.infoText, { color: courseLevelColor }]}>
                {item.courseLevel}
              </Text>
            </View>

            <View style={styles.priceContainer}>
              <Icon name="tag" size={16} color={Colors.teal_dark} />
              <Text style={styles.priceText}>{item.coursePrice}$</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      </Link>
    );
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {loading && <Text>Loading...</Text>}
          {error && <Text style={{ color: "red" }}>{error}</Text>}

          <View style={styles.header}>
            <Text style={styles.title}>Next course for you</Text>
            <Text style={styles.subtitle}>
              Based on your current course, we recommend the following courses.
            </Text>
          </View>

          <FlatList
            data={suggestCourse}
            renderItem={({ item }) => <CourseCard item={item} />}
            keyExtractor={(item) => item.courseId}
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.replace("/(home)/home")}
          >
            <Text style={styles.closeButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    margin: 10,
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: 160,
    backgroundColor: "#f5f5f5",
  },
  cardContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: Colors.dark_grey,
    marginBottom: 12,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.teal_dark,
  },
  courseInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.teal_dark,
  },
  viewButton: {
    backgroundColor: Colors.teal_dark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 6,
  },
  viewButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  closeButton: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  closeButtonText: {
    ...text.h4,
    color: Colors.black,
    fontWeight: "600",
  },
});

export default SuggestCourse;
