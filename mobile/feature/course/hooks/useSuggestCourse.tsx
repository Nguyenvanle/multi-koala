import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { suggestCourseServices } from "../services/suggest-course";
import { CourseBodyList } from "../types/suggest-course";
import { EnrolledBody } from "../types/course-enrolled";

export const useSuggestCourse = () => {
  const [getEnrollId, setGetEnrollId] = useState<EnrolledBody>();
  const [suggestCourse, setSuggestCourse] = useState<CourseBodyList>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchSuggestCourse = async () => {
    setLoading(true);
    setError(""); // Reset error state trước khi fetch

    try {
      const token = await AsyncStorage.getItem("token");

      console.log("Token:", token); // Kiểm tra token

      if (!token) {
        setError("Không tìm thấy token. Vui lòng đăng nhập.");
        return;
      }

      const response = await suggestCourseServices.getSuggest(
        token,
        getEnrollId.enrollCourseId
      ); // Truyền courseId vào API

      console.log("Response from API:", response); // Log phản hồi để kiểm tra

      if (response && response.data.result) {
        setSuggestCourse(response.data.result);
      } else {
        setError("Lấy khóa học đề xuất không thành công.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi trong quá trình lấy khóa học đề xuất.");
    } finally {
      setLoading(false);
    }
  };

  return { suggestCourse, loading, error, fetchSuggestCourse };
};
