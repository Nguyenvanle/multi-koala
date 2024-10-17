import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalSearchParams } from "expo-router";
import { CourseDelete, ResultCourse } from "../types/favourite-course";
import { CoursePostService } from "../services/favourite-post";
import { CourseDeleteService } from "../services/favourite-delete";

const usePostCourse = () => {
  const { courseId } = useGlobalSearchParams(); // Lấy courseId từ params
  const courseIdString = courseId as string;
  const [loadingPost, setLoading] = useState<boolean>(true);
  const [errorPostMessage, setErrorPostMessage] = useState<string>("");
  const [postCourse, setPostCourse] = useState<ResultCourse | null>(null);
  const [deleteCourse, setDeleteCourse] = useState<CourseDelete | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleToggleFavourite = async () => {
    try {
      setIsLiked(!isLiked);
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      console.log(token);
      console.log(courseId);
      // Gửi thông tin khóa học yêu thích lên server
      const postResult = await CoursePostService.postCourse({
        token: token,
        courseId: courseIdString,
      });
      console.log(1);
      console.log(postResult);

      // if (
      //   postResult &&
      //   postResult.data &&
      //   postResult.data.result &&
      //   isLiked === true
      // ) {
      //   setPostCourse(postResult.data.result);
      // } else {
      //   const deleteResult = await CourseDeleteService.deleteCourse(
      //     postResult.data.result.favouriteId,
      //     token
      //   );
      //   setDeleteCourse(deleteCourse);
      // }
    } catch (error) {
      console.error(error.message || "Error fetching post course.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loadingPost,
    errorPostMessage,
    postCourse,
    deleteCourse,
    isLiked,
    setIsLiked,
    handleToggleFavourite,
  };
};

export default usePostCourse;
