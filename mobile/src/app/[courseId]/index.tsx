import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useDetails } from "../../feature/course/hooks/useDetails";
import { useCourseRating } from "@/src/feature/course/hooks/useCourseRating";
import { useCourseDiscount } from "@/src/feature/discount/hooks/useCourseDiscount";
import { useLesson } from "../../feature/lesson/hooks/useLesson";
import { LessonBody } from "../../feature/lesson/types/lesson";
import useUser from "../../feature/user/hooks/useUser";
import { useEnrolled } from "@/src/feature/course/hooks/useEnrrolled";
import { AntDesign } from "@expo/vector-icons";

const CourseDetails = ({ lessons = [] }: { lessons: LessonBody[] }) => {
  const [defaultRating, setDefaultRating] = useState(0);

  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starImgFilled =
    "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true";

  const starImgCorner =
    "https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true";

  const { courseId } = useGlobalSearchParams();

  const [showAllLessons, setShowAllLessons] = useState(false);

  const { user } = useUser();

  const { enrolled } = useEnrolled();

  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;

  const { lesson, errorMessage, loadinglesson } = useLesson(courseIdString);

  const { courseDetails, loading, errorMessageDetails } =
    useDetails(courseIdString);

  const { courseRating } = useCourseRating(courseIdString);

  const { discount } = useCourseDiscount(courseIdString);

  const [isLiked, setIsLiked] = useState(false); // Trạng thái yêu thích

  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái cho Modal

  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  if (errorMessageDetails) {
    return <Text>Error: {errorMessageDetails}</Text>;
  }

  if (!courseDetails) {
    return <Text>No course detail</Text>;
  }

  const CustomRatingBar = ({ courseRating = 0 }: { courseRating?: number }) => {
    const filledStars = Math.round(courseRating * 5); // Assuming courseRating is between 0 and 1

    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((rating) => (
          <View key={rating}>
            <Image
              style={styles.starImgStyle}
              source={
                rating <= filledStars
                  ? { uri: starImgFilled }
                  : { uri: starImgCorner }
              }
            />
          </View>
        ))}
      </View>
    );
  };

  // Kiểm tra xem enrolled có phải là một mảng không
  const isEnrolled =
    Array.isArray(enrolled) &&
    enrolled.some(
      (enrolledCourse) => enrolledCourse.course.courseId === courseIdString
    );

  const priceDiscount = courseDetails.coursePrice;
  const finalPrice = priceDiscount * (1 - (discount?.discountApplied || 0));
  const shouldShowOriginalPrice = priceDiscount !== finalPrice;

  // Xác định màu sắc cho courseLevel
  let courseLevelColor = Colors.black; // Mặc định là màu đen
  if (courseDetails.courseLevel === "BEGINNER") {
    courseLevelColor = "#0d9488"; // Màu xanh lá
  } else if (courseDetails.courseLevel === "INTERMEDIATE") {
    courseLevelColor = "#eab308"; // Màu vàng
  } else if (courseDetails.courseLevel === "ADVANCED") {
    courseLevelColor = "#f97316"; // Màu cam
  } else if (courseDetails.courseLevel === "EXPERT") {
    courseLevelColor = "#ef4444"; // Màu đỏ
  }

  const renderLessonItem = ({
    item,
    index,
  }: {
    item: LessonBody;
    index: number;
  }) => {
    const isClickable = index < 3 || isEnrolled; // Cho phép truy cập vào chi tiết bài học nếu đã đăng ký hoặc là bài học đầu tiên

    return (
      <TouchableOpacity
        style={[styles.lessonItem, !isClickable && { opacity: 0.5 }]}
        onPress={() => {
          if (isClickable) {
            router.push(`/${courseIdString}/${item.lessonId}`);
          }
        }}
      >
        <Image
          source={{ uri: item.image.imageUrl }}
          style={styles.lessonThumbnail}
        />
        <View style={styles.lessonInfo}>
          <Text style={styles.lessonTitle} numberOfLines={2}>
            {item.lessonName}
          </Text>
          <Text style={styles.lessonDuration}>
            {Math.floor(item.video.videoDuration / 60)}m
            {(item.video.videoDuration % 60).toString().padStart(2, "0")}s
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const isLoggedIn = !!user;
  const displayedLessons = showAllLessons ? lesson : lesson?.slice(0, 3);

  const lessonCount = lesson ? lesson.length : 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, paddingBottom: 80 }}>
        <Image
          source={{ uri: courseDetails.image.imageUrl }}
          style={styles.image}
        />
        <View style={styles.content}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.instructor}>
              {courseDetails.uploadedByTeacher?.firstname}{" "}
              {courseDetails.uploadedByTeacher?.lastname}
            </Text>
            <CustomRatingBar courseRating={courseRating?.avgcourseRating} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title} numberOfLines={3}>
              {courseDetails.courseName}
            </Text>
            <TouchableOpacity
              onPress={() => setIsLiked(!isLiked)} // Đổi trạng thái yêu thích khi chạm
            >
              <AntDesign
                name="heart"
                size={32}
                color={isLiked ? "#FF4E88" : Colors.grey} // Thay đổi màu sắc dựa trên trạng thái
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.lessonCount}>Total Lessons: {lessonCount}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Array.isArray(courseDetails.types) &&
              courseDetails.types.map((type: any) => (
                <TouchableOpacity key={type.typeName} style={styles.typeButton}>
                  <Text
                    style={{ ...styles.fieldName, color: Colors.teal_dark }}
                  >
                    {type.typeName}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
          <View
            style={{ flexDirection: "row", marginBottom: 8, flexWrap: "wrap" }}
          >
            {Array.isArray(courseDetails.fields) &&
              courseDetails.fields.map((field: any) => (
                <TouchableOpacity
                  key={field.fieldName}
                  style={styles.fieldButton}
                >
                  <Text style={styles.fieldName}>{field.fieldName}</Text>
                </TouchableOpacity>
              ))}
          </View>

          <Text style={[styles.courseLevel, { color: courseLevelColor }]}>
            {courseDetails.courseLevel}
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text style={styles.price}>${finalPrice.toFixed(2)}</Text>
            {shouldShowOriginalPrice && (
              <Text style={styles.originalPrice}>
                / ${courseDetails.coursePrice.toFixed(2)}
              </Text>
            )}
          </View>
          <Text style={styles.sectionTitle}>About This Course</Text>
          <Text style={styles.description}>
            {courseDetails.courseDescription}
          </Text>
        </View>

        {loadinglesson ? (
          <View style={{ paddingTop: 16, justifyContent: "center" }}>
            <ActivityIndicator size={"large"} color={Colors.teal_dark} />
          </View>
        ) : lesson && lesson.length > 0 ? (
          <>
            <FlatList
              data={displayedLessons}
              renderItem={renderLessonItem}
              keyExtractor={(item) => item.lessonId}
              scrollEnabled={false}
            />
            {lesson && lesson.length > 3 && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={() => setShowAllLessons(!showAllLessons)}
              >
                <Text style={styles.showMoreButtonText}>
                  {showAllLessons ? "Show Less" : "Show More"}
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={{ ...text.p, color: Colors.teal_dark }}>
            No lessons available
          </Text>
        )}

        {/* Hiển thị nút Buy Now nếu khóa học chưa được đăng ký */}
        {!isEnrolled && (
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => {
              if (isLoggedIn) {
                if (lesson.length > 0) {
                  // Logic to buy the course
                } else {
                  Alert.alert("Notification", "No lessons available to buy");
                }
              } else {
                Alert.alert(
                  "LogIn Required",
                  "You need to logIn to buy this course",
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
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  starImgStyle: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  showMoreButton: {
    alignItems: "flex-start",
  },
  showMoreButtonText: {
    ...text.link,
    color: Colors.teal_dark,
    fontWeight: "500",
  },
  container: {
    backgroundColor: Colors.background,
    padding: 24,
  },
  image: {
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 400,
    borderRadius: 20,
  },
  content: {
    gap: 8,
    paddingVertical: 16,
  },
  instructor: {
    ...text.h3,
    color: Colors.teal_dark,
  },
  title: {
    ...text.h2,
    color: Colors.black,
    marginTop: 8,
    flexShrink: 1,
  },
  price: {
    ...text.h3,
    color: Colors.teal_dark,
  },
  originalPrice: {
    ...text.h3,
    textDecorationLine: "line-through",
    color: Colors.dark_grey,
  },
  sectionTitle: {
    ...text.h4,
    color: Colors.black,
    marginTop: 8,
    fontWeight: "400",
  },
  description: {
    ...text.p,
    color: Colors.dark_grey,
  },
  lessonItem: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  lessonThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  lessonInfo: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: "flex-start",
    height: 80,
    gap: 8,
  },
  lessonTitle: {
    ...text.large,
    color: Colors.black,
    fontWeight: "400",
  },
  lessonDuration: {
    ...text.small,
    color: Colors.teal_dark,
  },
  buyButton: {
    backgroundColor: Colors.teal_dark,
    padding: 16,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 24,
  },
  buyButtonText: {
    ...text.h4,
    color: Colors.white,
  },
  typeButton: {
    borderRadius: 20,
    backgroundColor: "#BDE8CA",
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  fieldButton: {
    borderRadius: 20,
    backgroundColor: "#41B3A2",
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  fieldName: {
    ...text.small,
    color: Colors.white,
  },
  courseLevel: {
    ...text.large,
    fontWeight: "400",
    color: Colors.super_teal_dark,
  },
  lessonCount: {
    ...text.p,
    color: Colors.dark_grey,
    marginBottom: 8,
  },
});

export default CourseDetails;
