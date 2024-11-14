import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResultBodyList } from "../types/recommend-course";
import { recommendCourseServices } from "../services/recommend-course";

export const useRecommendCourse = (courseId?: string) => {
  const [recommend, setRecommend] = useState<ResultBodyList>();
  const [errorMessageRecommend, setErrorMessageRecommend] =
    useState<string>("");
  const [loadingRecommend, setLoadingRecommend] = useState<boolean>(true);

  useEffect(() => {
    const getRecommend = async () => {
      try {
        setLoadingRecommend(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setErrorMessageRecommend("No token found. Please log in.");
          return;
        }

        // Gọi API để lấy khóa học
        const recommendCourse = await recommendCourseServices.getRecommend({
          token,
        });

        // Kiểm tra xem course có tồn tại và có dữ liệu không
        if (
          recommendCourse &&
          recommendCourse.data &&
          recommendCourse.data.result
        ) {
          setRecommend(recommendCourse.data.result);
        } else {
          setErrorMessageRecommend("Get recommend course failed.");
        }
      } catch (error) {
        // Xử lý lỗi
        setErrorMessageRecommend(
          "An error occurred while fetching the recommend course."
        );
      } finally {
        setLoadingRecommend(false);
      }
    };

    getRecommend(); // Gọi hàm getCourse
  }, [courseId]); // Thêm courseId vào dependency array

  return { recommend, errorMessageRecommend, loadingRecommend }; // Trả về giá trị
};
