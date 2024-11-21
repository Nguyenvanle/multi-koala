import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { suggestCourseServices } from "../services/suggest-course";
import { CourseBodyList } from "../types/suggest-course";

export const useSuggestCourse = (courseId: string) => {
  const [suggestCourse, setSuggestCourse] = useState<CourseBodyList>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getSuggest = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }
        const data = await suggestCourseServices.getSuggest(token, courseId);
        if (data && data.data && data.data.result) {
          setSuggestCourse(data.data.result);
        } else {
          setError("Get suggest failed.");
        }
      } finally {
        setLoading(false);
      }
    };

    getSuggest(); // Gọi hàm getRating
  }, [courseId]); // Thêm courseId vào dependency array

  return { suggestCourse, loading, error };
};
