import { useEffect, useState } from "react";
import { EnrolledBodyList } from "../types/course-enrolled";
import { enrolledServices } from "../services/course-enrolled";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useEnrolled = (courseId?: string) => {
  const [enrolled, setEnrolled] = useState<EnrolledBodyList>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCourse = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found. Please log in.");
          return;
        }

        // Gọi API để lấy khóa học
        const course = await enrolledServices.getEnrolled({ token });

        // Kiểm tra xem course có tồn tại và có dữ liệu không
        if (course && course.data && course.data.result) {
          setEnrolled(course.data.result);
        } else {
          setErrorMessage("Get course failed.");
        }
      } catch (error) {
        // Xử lý lỗi
        setErrorMessage("An error occurred while fetching the course.");
      } finally {
        setLoading(false);
      }
    };

    getCourse(); // Gọi hàm getCourse
  }, [courseId]); // Thêm courseId vào dependency array

  return { enrolled, errorMessage, loading }; // Trả về giá trị
};
