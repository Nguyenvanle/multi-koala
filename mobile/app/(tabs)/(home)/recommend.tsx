import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";
import { useRecommendCourse } from "@/feature/course/hooks/useRecommendCourse";
import { useSuggestCourse } from "@/feature/course/hooks/useSuggestCourse";
import { ResultBody } from "@/feature/course/types/recommend-course";
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
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const RecommendCourse = () => {
  const { courseId } = useGlobalSearchParams();
  const { recommend, loadingRecommend, errorMessageRecommend } =
    useRecommendCourse();

  // CourseCard Component
  const CourseCard = ({ item }: { item: ResultBody }) => {
    return (
      <Link style={styles.card} href={`/${item.courseId}`}>
        <Image
          source={{ uri: item.image?.imageUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {item.courseName}
          </Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      </Link>
    );
  };

  if (loadingRecommend) {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color={Colors.teal_dark} />
        </View>
      </Modal>
    );
  }

  if (errorMessageRecommend) {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={{ color: Colors.red }}>{errorMessageRecommend}</Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Recommended Courses</Text>
            <Text style={styles.subtitle}>Courses tailored just for you</Text>
          </View>

          <FlatList
            data={Array.isArray(recommend) ? recommend : []}
            renderItem={({ item }) => <CourseCard item={item} />}
            keyExtractor={(item) => item.courseId}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No recommended courses found
                </Text>
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.replace("/(home)/home")}
          >
            <Text style={styles.closeButtonText}>Close</Text>
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    color: Colors.dark_grey,
    fontSize: 16,
  },
});

export default RecommendCourse;
