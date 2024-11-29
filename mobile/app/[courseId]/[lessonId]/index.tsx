import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { router, useGlobalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";
import { useLessonDetails } from "@/feature/lesson/hooks/useLessonDetails";
import YoutubePlayer from "react-native-youtube-iframe";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useLesson } from "@/feature/lesson/hooks/useLesson";
import { useEnrolled } from "@/feature/course/hooks/useEnrrolled";
import { useTestDetails } from "@/feature/test/hooks/useTestDetails";

const LessonDetails = () => {
  const { courseId, testId, lessonId } = useGlobalSearchParams();
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const testIdString = Array.isArray(testId) ? testId[0] : testId;
  const { enrolled } = useEnrolled();
  const { lessonDetails, errorMessageDetails, loadingLessonDetails } =
    useLessonDetails(lessonIdString);
  const { lesson, loadingLesson } = useLesson(courseIdString);
  const [showAllLessons, setShowAllLessons] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { testDetails } = useTestDetails(lessonIdString, testIdString);

  const handleFullScreenChange = async (status) => {
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

  // Save lessonId to AsyncStorage
  const saveLessonId = async () => {
    try {
      await AsyncStorage.setItem("lessonId", lessonIdString);
    } catch (error) {
      console.error("Failed to save the lesson ID to AsyncStorage:", error);
    }
  };

  if (loadingLessonDetails) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator color={Colors.teal_dark} />
      </View>
    );
  }

  if (errorMessageDetails) {
    return <Text>Error: {errorMessageDetails}</Text>;
  }

  if (!lessonDetails) {
    return <Text>No lesson detail</Text>;
  }

  const isEnrolled =
    Array.isArray(enrolled) &&
    enrolled.some(
      (enrolledCourse) => enrolledCourse.course.courseId === courseIdString
    );

  const renderVideo = () => {
    if (lessonDetails?.video?.videoUrl === "videoUrl-test-update") return;
    if (
      lessonDetails?.video?.videoUrl.includes("youtube.com") ||
      lessonDetails?.video?.videoUrl.includes("youtu.be")
    ) {
      const videoId =
        lessonDetails?.video?.videoUrl.split("v=")[1]?.split("&")[0] ||
        lessonDetails?.video?.videoUrl.split("/").pop();
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
          source={{ uri: lessonDetails?.video?.videoUrl }}
          style={styles.video}
          useNativeControls
          videoStyle={{ borderRadius: 10 }}
          isLooping
          resizeMode={ResizeMode.CONTAIN}
        />
      );
    }
  };

  const renderLessonItem = ({ item, index }) => {
    const isFirstThree = index < 3 || isEnrolled;
    const isSelected = item?.lesson?.lessonId === lessonIdString;
    return (
      <TouchableOpacity
        style={[
          styles.lessonItem,
          !isFirstThree && { opacity: 0.5 },
          isSelected && { backgroundColor: Colors.teal_light },
        ]}
        onPress={() => {
          if (isFirstThree) {
            router.replace(`/${courseIdString}/${item?.lesson?.lessonId}`);
          }
        }}
        disabled={isSelected}
      >
        <Text style={{ ...text.large, fontWeight: "400", marginRight: 8 }}>
          {index + 1}.{" "}
        </Text>
        <Image
          source={{
            uri:
              item?.lesson?.image?.imageUrl ||
              "https://img.freepik.com/free-vector/faqs-concept-illustration_114360-5215.jpg?t=st=1732892833~exp=1732896433~hmac=f12b1f3fbbb20b6e374e81fb1d3283827dcf73904ef5d6c29434936df1b0432b&w=826",
          }}
          style={styles.lessonThumbnail}
        />
        <View style={styles.lessonInfo}>
          <Text style={styles.lessonTitle}>{item?.lesson?.lessonName}</Text>
          <Text style={styles.lessonDuration}>
            {Math.floor(item?.lesson?.video?.videoDuration / 60)}:
            {(item?.lesson?.video?.videoDuration % 60)
              .toString()
              .padStart(2, "0")}{" "}
            mins
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const displayedLessons = showAllLessons ? lesson : lesson?.slice(0, 3);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, paddingBottom: 80 }}>
        {lessonDetails?.video?.videoUrl != "videoUrl-test-update" ? (
          <View style={styles.video}>{renderVideo()}</View>
        ) : (
          ""
        )}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {lessonDetails?.lessonName}
          </Text>
          <Text style={styles.duration}>
            {Math.floor(lessonDetails?.video?.videoDuration / 60)}:
            {(lessonDetails?.video?.videoDuration % 60)
              .toString()
              .padStart(2, "0")}{" "}
            mins
          </Text>
          <Text style={styles.sectionTitle}>About This Lesson</Text>
          <Text style={styles.description}>
            {lessonDetails?.lessonDescription}
          </Text>
          {loadingLesson ? (
            <View style={{ paddingTop: 16, justifyContent: "center" }}>
              <ActivityIndicator color={Colors.teal_dark} />
            </View>
          ) : lesson && lesson.length > 0 ? (
            <>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => {
                  router.push(
                    `/${courseIdString}/${lessonIdString}/${testDetails}/`
                  );
                }}
              >
                <Text style={styles.buyButtonText}>Take Exam</Text>
              </TouchableOpacity>
              <Text
                style={{ ...text.h4, color: Colors.black, fontWeight: "400" }}
              >
                Lesson list
              </Text>
              <FlatList
                data={displayedLessons}
                renderItem={renderLessonItem}
                keyExtractor={(item) => item.lesson.lessonId}
                scrollEnabled={false}
              />
              {lesson.length > 3 && (
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
            <Text style={{ ...text.p, color: Colors.red }}>
              No lessons available
            </Text>
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
    marginVertical: 16,
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
    fontWeight: "300",
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
