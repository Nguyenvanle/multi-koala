import { useState } from "react";
import { PostEnrolled } from "../types/post-enroll";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postEnrollCourseServices } from "../services/post-enroll";

export const usePostEnroll = () => {
  const [postEnroll, setPostEnroll] = useState<PostEnrolled>();
  const [loadingPostEnroll, setLoadingPostEnroll] = useState<boolean>(true);
  const [errorPostEnroll, setErrorPostEnroll] = useState<string | null>(null);

  const fetchPostEnroll = async (courseId: string) => {
    try {
      setLoadingPostEnroll(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setErrorPostEnroll("No token found. Please log in.");
        return;
      }

      console.log("Attempting to enroll with:", { courseId, token });

      const postEnrolled = await postEnrollCourseServices.postEnrolled(
        token,
        courseId
      );

      if (postEnrolled?.data) {
        console.log("Enrollment Data:", postEnrolled.data);
        setPostEnroll(postEnrolled.data);
      } else {
        console.error("No data in response");
        setErrorPostEnroll("Failed to enroll in course");
      }
    } catch (err: any) {
      console.error("Enrollment Error:", err);
      setErrorPostEnroll(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred"
      );
    } finally {
      setLoadingPostEnroll(false);
    }
  };

  return { postEnroll, loadingPostEnroll, errorPostEnroll, fetchPostEnroll };
};
