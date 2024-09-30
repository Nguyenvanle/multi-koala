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
import { AirbnbRating } from "react-native-ratings";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useDetails } from "../../feature/course/hooks/useDetails";
import { useCourseRating } from "@/src/feature/course/hooks/useCourseRating";
import { useCourseDiscount } from "@/src/feature/discount/hooks/useCourseDiscount";
import { useLesson } from "../../feature/lesson/hooks/useLesson";
import { LessonBody } from "../../feature/lesson/types/lesson";
import useUser from "../../feature/user/hooks/useUser";

// Giả định rằng bạn có một hook hoặc function để fetch dữ liệu khóa học

const CourseDetails = ({ lessons }: { lessons: LessonBody[] }) => {
  const { courseId } = useGlobalSearchParams();
  const [showAllLessons, setShowAllLessons] = useState(false);
  const { user } = useUser();

  // Chuyển đổi courseId thành chuỗi nếu cần
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const { lesson, errorMessage, loadinglesson } = useLesson(courseIdString);
  const { courseDetails, loading, errorMessageDetails } =
    useDetails(courseIdString);
  const { courseRating } = useCourseRating(courseIdString);
  const { discount } = useCourseDiscount(courseIdString);

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
  const priceDiscount = courseDetails.coursePrice;
  const finalPrice = priceDiscount * (1 - (discount?.discountApplied || 0));
  const shouldShowOriginalPrice = priceDiscount !== finalPrice;
  const renderLessonItem = ({
    item,
    index,
  }: {
    item: LessonBody;
    index: number;
  }) => {
    const isFirstThree = index < 3; // Kiểm tra nếu là một trong ba bài học đầu tiên

    return (
      <TouchableOpacity
        style={[styles.lessonItem, !isFirstThree && { opacity: 0.5 }]} // Giảm độ mờ cho các bài học không được phép nhấp
        onPress={() => {
          if (isFirstThree) {
            router.push(`/${courseIdString}/${item.lessonId}`);
          }
        }}
      >
        <Image
          source={{ uri: item.image.imageUrl }}
          style={styles.lessonThumbnail}
        />
        <View style={styles.lessonInfo}>
          <Text style={styles.lessonTitle}>{item.lessonName}</Text>
          <Text style={styles.lessonDuration}>
            {Math.floor(item.video.videoDuration / 60)}:
            {(item.video.videoDuration % 60).toString().padStart(2, "0")} mins
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const isLoggedIn = !!user;
  const displayedLessons =
    isLoggedIn && showAllLessons ? lesson : lesson?.slice(0, 3);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, paddingBottom: 80 }}>
        <Image
          source={{ uri: courseDetails.image.imageUrl }}
          style={styles.image}
        />
        <View style={styles.content}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.instructor}>
              {courseDetails.uploadedByTeacher?.firstname}{" "}
              {courseDetails.uploadedByTeacher?.lastname}
            </Text>
            <Text></Text>
            {/* Sử dụng ?? để đảm bảo có giá trị */}
            <AirbnbRating
              count={5}
              size={20}
              ratingContainerStyle={{ padding: 0 }}
              showRating={false}
              defaultRating={(courseRating?.avgcourseRating ?? 0) * 5} // Không làm tròn, giữ nguyên giá trị thập phân            showRating={true} // Đặt showRating thành false để ẩn phần đánh giá
              isDisabled={true} // Thiết lập isDisabled để không cho phép đánh giá
            />
          </View>
          <Text style={styles.title}>{courseDetails.courseName}</Text>
          {/* Hiển thị tất cả typeName */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Array.isArray(courseDetails.types) &&
              courseDetails.types.map((type: any) => (
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    backgroundColor: "#BDE8CA",
                    padding: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text key={type.typeName} style={styles.typeName}>
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
                  style={{
                    borderRadius: 20,
                    backgroundColor: "#41B3A2",
                    padding: 8,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text
                    key={field.fieldName}
                    style={{ ...styles.typeName, color: Colors.grey }}
                  >
                    {field.fieldName}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
          <Text
            style={{
              ...text.large,
              fontWeight: "400",
              color: Colors.super_teal_dark,
            }}
          >
            {courseDetails.courseLevel}
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text style={styles.price}>${finalPrice.toFixed(2)}</Text>
            {shouldShowOriginalPrice && (
              <Text
                style={{
                  ...styles.price,
                  textDecorationLine: "line-through",
                  color: Colors.dark_grey,
                }}
              >
                ${courseDetails.coursePrice.toFixed(2)}
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
            {lesson.length > 3 && !showAllLessons && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={() => {
                  if (isLoggedIn) {
                    setShowAllLessons(true);
                  } else {
                    Alert.alert(
                      "Notification",
                      "Please sign in to view more lessons"
                    );
                  }
                }}
              >
                <Text style={styles.showMoreButtonText}>
                  {isLoggedIn ? "Show More" : "Sign in to view more"}
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={{ ...text.p, color: Colors.red }}>
            No lessons available
          </Text>
        )}
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    ...text.h2,
    color: Colors.black,
    marginTop: 8,
  },
  duration: {
    ...text.small,
    color: Colors.red,
  },
  price: {
    ...text.h3,
    color: Colors.teal_dark,
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
  typeName: {
    ...text.small,
    color: Colors.dark_grey,
  },
});

export default CourseDetails;
