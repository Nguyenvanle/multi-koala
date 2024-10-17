import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalSearchParams } from "expo-router";
import { ResultCourse } from "../types/favourite-course";
import { CoursePostService } from "../services/favourite-post";
import { CourseDeleteService } from "../services/favourite-delete";

const usePostCourse = () => {
  const courseId = useGlobalSearchParams(); // Lấy courseId từ params
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const [loadingPost, setLoading] = useState<boolean>(true);
  const [errorPostMessage, setErrorPostMessage] = useState<string>("");
  const [postCourse, setPostCourse] = useState<ResultCourse | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleToggleFavourite = async () => {
    setIsLiked(!isLiked);
    console.log(isLiked);
  };

  useEffect(() => {
    const fetchFavouriteCourse = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        // console.log(token);
        // Gửi thông tin khóa học yêu thích lên server
        const postResult = await CoursePostService.postCourse(
          courseIdString,
          token
        );
        if (
          postResult &&
          postResult.data &&
          postResult.data.result &&
          isLiked === true
        ) {
          setPostCourse(postResult.data.result);
          console.log(postResult.data.result);
        } else {
          const deleteResult = await CourseDeleteService.deleteCourse(
            postResult.data.result.favouriteId,
            token
          );
          console.log(deleteResult.data.message);
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
    isLiked,
    setIsLiked,
    handleToggleFavourite,
  };
};

export default usePostCourse;
