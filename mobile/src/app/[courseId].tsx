import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useGlobalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useCourseDetails } from "../feature/course/types/course-details";
import { useCourseRating } from "./../feature/course/hooks/useCourseRating";
import { useCourseDiscount } from "../feature/discount/hooks/useCourseDiscount";

// Giả định rằng bạn có một hook hoặc function để fetch dữ liệu khóa học

const CourseDetails = () => {
  const { courseId } = useGlobalSearchParams();

  // Chuyển đổi courseId thành chuỗi nếu cần
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;

  const { courseDetails, loading, error } = useCourseDetails(courseIdString);
  const { courseRating } = useCourseRating(courseIdString);
  const { discount } = useCourseDiscount(courseIdString);

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!courseDetails) {
    return <Text>No course</Text>;
  }
  const priceDiscount = courseDetails.coursePrice;
  const finalPrice = priceDiscount * (1 - (discount?.discountApplied || 0));

  const shouldShowOriginalPrice = priceDiscount !== finalPrice;

  return (
    <ScrollView style={styles.container}>
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
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>
          Buy Now | ${finalPrice.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  lessonThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 10,
  },
  lessonTitle: {
    ...text.p,
    color: Colors.black,
  },
  lessonDuration: {
    ...text.small,
    color: Colors.red,
  },
  buyButton: {
    backgroundColor: Colors.teal_dark,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  buyButtonText: {
    ...text.h4,
    color: Colors.white,
  },
});

export default CourseDetails;
