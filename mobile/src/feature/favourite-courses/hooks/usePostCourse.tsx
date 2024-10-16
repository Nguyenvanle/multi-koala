import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalSearchParams } from "expo-router";
import { ResultCourse } from "../types/favourite-course";
import { CoursePostService } from "../services/favourite-post";
import useGetCourse from "./useGetFavourite";

const usePostCourse = () => {
  const courseId = useGlobalSearchParams(); // Lấy courseId từ params
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const [loadingPost, setLoading] = useState<boolean>(true);
  const [errorPostMessage, setErrorPostMessage] = useState<string>("");
  const [postCourse, setPostCourse] = useState<ResultCourse | null>(null);

  useEffect(() => {
    const fetchFavouriteCourse = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        // console.log(token);
        // Lấy thông tin khóa học yêu thích từ server
        const result = await CoursePostService.postCourse(
          courseIdString,
          token
        );
        if (result && result.data && result.data.result) {
          setPostCourse(result.data.result);
          // console.log(result.data.result);
        } else {
          setErrorPostMessage("Can not choose your favourite course.");
        }
      } catch (error) {
        // console.log(error.message || "Error fetching post course.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteCourse();
  }, [courseIdString]);

  return {
    loadingPost,
    errorPostMessage,
    postCourse,
  };
};

export default usePostCourse;
