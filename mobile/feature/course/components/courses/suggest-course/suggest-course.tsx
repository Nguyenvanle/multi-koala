import { useSuggestCourse } from "@/feature/course/hooks/useSuggestCourse";
import { CourseBody } from "@/feature/course/types/suggest-course";
import React, { useEffect } from "react";
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

const SuggestCourse = ({ enrollCourse }) => {
  const { suggestCourse, loading, error, fetchSuggestCourse } =
    useSuggestCourse();

  // CourseCard Component
  const CourseCard = ({ item }: { item: CourseBody }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        // onPress={() => router.push("/")}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.image.imageUrl }} // Đảm bảo cung cấp URI hợp lệ cho thumbnail
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
              <Text style={styles.infoText}>{item.courseLevel}</Text>
            </View>

            <View style={styles.priceContainer}>
              <Icon name="tag" size={16} color="#007AFF" />
              <Text style={styles.priceText}>{item.coursePrice}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Xem chi tiết</Text>
            <Icon name="arrow-right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {loading && <Text>Đang tải khóa học gợi ý...</Text>}
          {error && <Text style={{ color: "red" }}>{error}</Text>}

          <View style={styles.header}>
            <Text style={styles.title}>Khóa học tiếp theo cho bạn</Text>
            <Text style={styles.subtitle}>
              Dựa trên khóa học hiện tại của bạn, chúng tôi đề xuất những khóa
              học sau
            </Text>
          </View>

          <FlatList
            data={suggestCourse}
            renderItem={({ item }) => <CourseCard item={item} />}
            keyExtractor={(item) => item.courseId}
          />

          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Đóng</Text>
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
    width: width * 0.9,
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
    color: "#333",
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: "#666",
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
    color: "#333",
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
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  viewButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 6,
  },
  viewButtonText: {
    color: "#fff",
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
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SuggestCourse;
