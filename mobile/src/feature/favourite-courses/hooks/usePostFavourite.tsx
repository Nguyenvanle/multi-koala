import { useEffect, useState } from "react";
import { ResultCourse } from "../types/favourite-course";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CoursePostService } from "../services/favourite-post";
import { useGlobalSearchParams } from "expo-router";
import { CourseDeleteService } from "../services/favourite-delete";

const usePostCourse = () => {
  const { courseId } = useGlobalSearchParams();
  const courseIdString = courseId as string; // Đảm bảo courseId là string
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [errorPostMessage, setErrorPostMessage] = useState<string>("");
  const [postCourse, setPostCourse] = useState<ResultCourse>();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleToggleFavourite = async () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const postFavourite = async () => {
      // Lấy Token
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      console.log(token);

      // Gọi hàm post
      try {
        setLoadingPost(true);
        const getPost = await CoursePostService.postCourse(
          token,
          courseIdString
        );
        if (
          getPost &&
          getPost.data &&
          getPost.data.result &&
          isLiked === true
        ) {
          setPostCourse(getPost.data.result);
          console.log(postCourse);
        } else {
          const getDelete = await CourseDeleteService.deleteCourse(
            getPost.data.result.favouriteId,
            token
          );
          if (getDelete && getDelete.data && getDelete.data.message) {
            console.log(getDelete.data.message);
          } else {
            console.error("Delete favourite failed.");
          }
        }
      } catch (error) {
        setErrorPostMessage("Error posting course as favourite.");
      } finally {
        setLoadingPost(false);
      }
    };
    postFavourite();
  }, [isLiked]);

  return {
    handleToggleFavourite,
    loadingPost,
    errorPostMessage,
    isLiked,
    postCourse,
  };
};

export default usePostCourse;
