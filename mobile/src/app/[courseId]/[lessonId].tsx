import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useLessonDetails } from "@/src/feature/lesson/hooks/useLessonDetails";
import YoutubePlayer from "react-native-youtube-iframe";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useLesson } from "@/src/feature/lesson/hooks/useLesson";
import useUser from "@/src/feature/user/hooks/useUser";
import { LessonBody } from "@/src/feature/lesson/types/lesson";
import { useEnrolled } from "@/src/feature/course/hooks/useEnrrolled";

const LessonDetails = () => {
  const { isBought } = useGlobalSearchParams(); // Nhận tham số từ router
  const { user } = useUser();
  const { courseId } = useGlobalSearchParams();
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const { enrolled } = useEnrolled();

  const { lessonId } = useGlobalSearchParams();
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const { lessonDetails, errorMessageDetails, loadingLessonDetails } =
    useLessonDetails(lessonIdString);
  const { lesson, errorMessage, loadinglesson } = useLesson(courseIdString);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = async (status: any) => {
    setIsFullScreen(status);
    if (status) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };

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
  // Kiểm tra xem enrolled có phải là một mảng không
  const isEnrolled =
    Array.isArray(enrolled) &&
    enrolled.some(
      (enrolledCourse) => enrolledCourse.course.courseId === courseIdString
    );
  const renderVideo = () => {
    if (!lessonDetails) return null;
    if (
      lessonDetails.video.videoUrl.includes("youtube.com") ||
      lessonDetails.video.videoUrl.includes("youtu.be")
    ) {
      const videoId =
        lessonDetails.video.videoUrl.split("v=")[1]?.split("&")[0] ||
        lessonDetails.video.videoUrl.split("/").pop();
      return (
        <YoutubePlayer
          height={230}
          videoId={videoId}
          onFullScreenChange={handleFullScreenChange}
        />
      );
    } else {
      return (
        <Video
          source={{ uri: lessonDetails.video.videoUrl }}
          style={styles.video}
          useNativeControls
          videoStyle={{ borderRadius: 10 }}
          isLooping
          resizeMode={ResizeMode.CONTAIN}
        />
      );
    }
  };

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
            router.replace(`/${courseIdString}/${item.lessonId}`);
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
        {renderVideo()}
        <View style={styles.content}>
          <Text style={styles.title}>{lessonDetails.lessonName}</Text>
          <Text style={styles.duration}>
            {Math.floor(lessonDetails.video.videoDuration / 60)}:
            {(lessonDetails.video.videoDuration % 60)
              .toString()
              .padStart(2, "0")}{" "}
            mins
          </Text>
          <Text style={styles.sectionTitle}>About This Lesson</Text>
          <Text style={styles.description}>
            {lessonDetails.lessonDescription}
          </Text>
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
          {/* Hiển thị nút Buy Now nếu khóa học chưa được đăng ký */}
          {!isEnrolled ? (
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                if (isLoggedIn) {
                  if (lesson.length > 0) {
                    // Logic to buy the course
                  } else {
                    Alert.alert("Notification", "No lessons available to view");
                  }
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
          ) : (
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                if (isLoggedIn) {
                  // Logic mua
                } else {
                  Alert.alert(
                    "Notification",
                    "Please sign in to view more lessons"
                  );
                }
              }}
            >
              <Text style={styles.buyButtonText}>Test Exam</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  showMoreButtonText: {
    ...text.link,
    color: Colors.teal_dark,
    fontWeight: "500",
  },
  showMoreButton: {
    alignItems: "flex-start",
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
  container: {
    backgroundColor: Colors.background,
    padding: 24,
  },
  video: {
    height: 220,
    overflow: "hidden",
  },
  title: {
    ...text.h2,
    color: Colors.super_teal_dark,
  },
  content: {
    gap: 8,
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
  duration: {
    ...text.small,
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
});

export default LessonDetails;
