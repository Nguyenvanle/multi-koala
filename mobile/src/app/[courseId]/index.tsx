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
import AirbnbRating from "@/src/components/atoms/airbnbRating-custom";
import { router, useGlobalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useDetails } from "../../feature/course/hooks/useDetails";
import { useCourseRating } from "@/src/feature/course/hooks/useCourseRating";
import { useCourseDiscount } from "@/src/feature/discount/hooks/useCourseDiscount";
import { useLesson } from "../../feature/lesson/hooks/useLesson";
import { LessonBody } from "../../feature/lesson/types/lesson";
import useUser from "../../feature/user/hooks/useUser";

const CourseDetails = ({ lessons }: { lessons: LessonBody[] }) => {
  const { courseId } = useGlobalSearchParams();
  const [showAllLessons, setShowAllLessons] = useState(false);
  const { user } = useUser();

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
    const isFirstThree = index < 3;

    return (
      <TouchableOpacity
        style={[styles.lessonItem, !isFirstThree && { opacity: 0.5 }]}
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
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.instructor}>
              {courseDetails.uploadedByTeacher?.firstname}{" "}
              {courseDetails.uploadedByTeacher?.lastname}
            </Text>
            <AirbnbRating
              defaultRating={Math.round(
                (courseRating?.avgcourseRating ?? 0) * 5
              )}
              // Các props khác nếu cần
            />
          </View>
          <Text style={styles.title}>{courseDetails.courseName}</Text>
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
          <Text style={styles.courseLevel}>{courseDetails.courseLevel}</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text style={styles.price}>${finalPrice.toFixed(2)}</Text>
            {shouldShowOriginalPrice && (
              <Text style={styles.originalPrice}>
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
            {lesson.length > 3 && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={() => {
                  if (isLoggedIn) {
                    setShowAllLessons(!showAllLessons);
                  } else {
                    Alert.alert(
                      "Notification",
                      "Please sign in to view more lessons"
                    );
                  }
                }}
              >
                <Text style={styles.showMoreButtonText}>
                  {isLoggedIn
                    ? showAllLessons
                      ? "Show Less"
                      : "Show More"
                    : "Sign in to view more"}
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={{ ...text.p, color: Colors.red }}>
            No lessons available
          </Text>
        )}

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
            if (isLoggedIn) {
            } else {
              Alert.alert(
                "Notification",
                "Please sign in to view more lessons"
              );
            }
          }}
        >
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
  title: {
    ...text.h2,
    color: Colors.black,
    marginTop: 8,
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
});

export default CourseDetails;
