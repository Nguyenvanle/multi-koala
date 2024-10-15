import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourseFavouriteService } from "../services/favourite-post";
import { useGlobalSearchParams } from "expo-router";
import { ResultCourse } from "../types/favourite-course";

const useFavouriteCourse = () => {
  const courseId = useGlobalSearchParams(); // Lấy courseId từ params
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;

  const [loading, setLoading] = useState<boolean>(true);
  const [errorFavouriteMessage, setErrorFavouriteMessage] =
    useState<string>("");
  const [favouriteCourse, setFavouriteCourse] = useState<ResultCourse | null>(
    null
  );
  const [isLiked, setIsLiked] = useState(false); // Trạng thái yêu thích

  useEffect(() => {
    const fetchFavouriteCourse = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        console.log(token);
        // Lấy thông tin khóa học yêu thích từ server
        const result = await CourseFavouriteService.postcourse(
          courseIdString,
          token
        );
        setFavouriteCourse(result.data.result);
        console.log(result.data.result);
        setIsLiked(true); // Nếu có kết quả, đánh dấu là yêu thích
      } catch (error) {
        console.log(error.message || "Error fetching favourite course.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteCourse();
  }, [courseIdString]);

  const handleLikeToggle = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("No token found. Please log in.");
      return;
    }

    try {
      // Gọi API để thêm hoặc xóa khóa học khỏi danh sách yêu thích
      if (!isLiked) {
        await CourseFavouriteService.postcourse(courseIdString, token);
        setIsLiked(true); // Đánh dấu là yêu thích
      } else {
        // await CourseFavouriteService.deletecourse(courseIdString, token); // Hàm xóa
        setIsLiked(false); // Đánh dấu là không yêu thích
      }
    } catch (error) {
      console.log(
        error.message || "An error occurred while updating favourite course."
      );
    }
  };

  return {
    loading,
    errorFavouriteMessage,
    isLiked,
    setIsLiked,
    handleLikeToggle,
    favouriteCourse,
  };
};

export default useFavouriteCourse;
