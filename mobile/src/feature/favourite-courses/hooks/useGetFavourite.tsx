import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResultCourse } from "../types/favourite-course";
import { CourseGetService } from "../services/favourite-get";

const useGetCourse = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorFavouriteMessage, setErrorFavouriteMessage] =
    useState<string>("");
  const [favouriteCourse, setFavouriteCourse] = useState<ResultCourse[]>([]); // Đặt giá trị mặc định là mảng rỗng

  useEffect(() => {
    const getCourse = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setErrorFavouriteMessage("No token found. Please log in.");
          return;
        }

        // Gọi API để lấy khóa học yêu thích
        const courseResponse = await CourseGetService.getFavourite({ token });

        // Kiểm tra xem courseResponse có tồn tại và có dữ liệu không
        if (
          courseResponse &&
          courseResponse.data &&
          Array.isArray(courseResponse.data.result)
        ) {
          setFavouriteCourse(courseResponse.data.result); // Gán dữ liệu nếu là mảng
        } else {
          setErrorFavouriteMessage("No favourite courses found.");
        }
      } catch (error) {
        setErrorFavouriteMessage(
          `An error occurred while fetching the favourite courses: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    getCourse();
  }, []);

  return {
    loading,
    errorFavouriteMessage,
    favouriteCourse,
  };
};

export default useGetCourse;
