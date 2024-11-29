import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { Styles, text } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import HeaderUser from "@/components/molecules/user/HeaderUser";
import { useEnrolled } from "@/feature/course/hooks/useEnrrolled";
import MyCourses from "@/feature/course/components/home/my-courses/MyCoures";
import NewCourses from "@/feature/course/components/home/new-courses/NewCourse";
import { UserContext } from "@/context/user/userContext";
import { useRecommendCourse } from "@/feature/course/hooks/useRecommendCourse";
import { ResultBody } from "@/feature/course/types/recommend-course";
import Icon from "react-native-vector-icons/Feather";
import AllCourses from "@/feature/course/components/courses/all-courses/AllCourses";

const Home = ({ courseId }: { courseId: string }) => {
  const { user } = useContext(UserContext);
  const { enrolled, errorMessage, loading } = useEnrolled(courseId);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const { recommend, loadingRecommend, errorMessageRecommend } =
    useRecommendCourse();

  // CourseCard Component
  const CourseCard = ({ item }: { item: ResultBody }) => {
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
      <Link
        style={styles.card}
        href={`/${item.courseId}`}
        onPress={() => setShowRecommendModal(false)} // Close modal when course is selected
      >
        <Image
          source={{
            uri:
              item?.image?.imageUrl ||
              "https://img.freepik.com/free-vector/faqs-concept-illustration_114360-5215.jpg?t=st=1732892833~exp=1732896433~hmac=f12b1f3fbbb20b6e374e81fb1d3283827dcf73904ef5d6c29434936df1b0432b&w=826",
          }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.courseTitle}>{item?.courseName}</Text>
          <Text style={styles.courseDescription}>
            {item?.courseDescription}
          </Text>

          <View style={styles.instructorContainer}>
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>
                {item?.uploadedByTeacher?.firstname}{" "}
                {item?.uploadedByTeacher?.lastname}
              </Text>
            </View>
          </View>

          <View style={styles.courseInfo}>
            <View style={styles.infoItem}>
              <Icon name="book-open" size={16} color="#666" />
              <Text style={[styles.infoText, { color: courseLevelColor }]}>
                {item?.courseLevel}
              </Text>
            </View>

            <View style={styles.priceContainer}>
              <Icon name="tag" size={16} color={Colors.teal_dark} />
              <Text style={styles.priceText}>{item?.coursePrice}$</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => setShowRecommendModal(false)} // Close modal when Enroll Now is pressed
          >
            <Text style={styles.viewButtonText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      </Link>
    );
  };

  // Recommended Courses Modal
  const RecommendCoursesModal = () => {
    if (loadingRecommend) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showRecommendModal}
          onRequestClose={() => setShowRecommendModal(false)}
        >
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color={Colors.teal_dark} />
          </View>
        </Modal>
      );
    }

    if (errorMessageRecommend) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showRecommendModal}
          onRequestClose={() => setShowRecommendModal(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={{ color: Colors.red }}>{errorMessageRecommend}</Text>
          </View>
        </Modal>
      );
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showRecommendModal}
        onRequestClose={() => setShowRecommendModal(false)}
      >
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
              onPress={() => setShowRecommendModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{ ...Styles.container }}>
      <StatusBar barStyle={"dark-content"} />
      {enrolled?.length > 0 && user ? (
        <View>
          <HeaderUser courseId={courseId} />

          <View>
            <View style={{ alignItems: "center", top: 120 }}>
              <View style={styles.sectionHeader}>
                <Text style={{ ...text.h4, fontWeight: "500" }}>
                  My Courses
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push("/(courses)/course-list?tab=inprogress")
                  }
                >
                  <Text style={{ ...text.p, color: Colors.teal_dark }}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <MyCourses />
            </View>
            <View style={{ ...styles.sectionHeader, top: 100 }}>
              <Text style={{ ...text.h4, fontWeight: "500" }}>
                Recommend Courses
              </Text>
              <TouchableOpacity onPress={() => setShowRecommendModal(true)}>
                <Text style={{ ...text.p, color: Colors.teal_dark }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <NewCourses />

            <RecommendCoursesModal />
          </View>
        </View>
      ) : (
        <View style={{}}>
          <HeaderUser courseId={courseId} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 400,
              padding: 24,
            }}
          >
            <Text style={{ ...text.h4, fontWeight: "500" }}>
              Recommend Courses
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(courses)/course-list?tab=all")}
            >
              <Text style={{ ...text.p, color: Colors.teal_dark }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <NewCourses />
        </View>
      )}
    </SafeAreaView>
  );
};

// Styles
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 400,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
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
    width: width * 0.9,
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
    width: "100%",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 8,
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
    marginTop: 10,
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
});

export default Home;
