import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { suggestCourseServices } from "../services/suggest-course";
import { CourseBodyList } from "../types/suggest-course";
import SuggestCourse from "../components/courses/suggest-course/suggest-course";

export const useSuggestCourse = () => {
  const [suggestCourse, setSuggestCourse] = useState<CourseBodyList>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getSuggest = async (courseId: string) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }
      const data = await suggestCourseServices.getSuggest(token, courseId);
      console.log("Suggest:", data.data.result);
      if (data && data.data && data.data.code === 200) {
        setSuggestCourse(data.data.result);
      } else {
        setError("Get suggest failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { suggestCourse, loading, error, getSuggest };
};
