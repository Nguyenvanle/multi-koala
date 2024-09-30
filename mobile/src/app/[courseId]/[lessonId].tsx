import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Video from "react-native-video"; // Import thư viện video
import { useGlobalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useLesson } from "../../feature/lesson/hooks/useLesson";
import useUser from "../../feature/user/hooks/useUser";
import { useLessonDetails } from "@/src/feature/lesson/hooks/useLessonDetails";

// Giả định rằng bạn có một hook hoặc function để fetch dữ liệu khóa học

const LessonDetails = () => {
  const { lessonId } = useGlobalSearchParams();
  const [showAllLessons, setShowAllLessons] = useState(false);
  const { user } = useUser();
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const { lessonDetails, errorMessageDetails, loadingLessonDetails } =
    useLessonDetails(lessonIdString);
  const { lesson, errorMessage, loadinglesson } = useLesson(lessonIdString);

  if (loadingLessonDetails) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  if (errorMessageDetails) {
    return <Text>Error: {errorMessageDetails}</Text>;
  }

  if (!lessonDetails) {
    return <Text>No lesson detail</Text>;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, paddingBottom: 80 }}>
        <Video
          source={{ uri: lessonDetails.video.videoUrl }} // Đường dẫn video
          style={styles.video}
          resizeMode="cover"
          controls={true} // Hiển thị các điều khiển video
          repeat={true} // Lặp lại video
        />
        <Text style={styles.title}>{lessonDetails.lessonName}</Text>

        {/* {loadinglesson ? (
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
        )} */}
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
  video: {
    height: 400, // Đặt chiều cao cho video
    borderRadius: 20,
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

export default LessonDetails;
