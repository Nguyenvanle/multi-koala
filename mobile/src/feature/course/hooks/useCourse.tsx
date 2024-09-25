import { useState, useEffect } from "react";
import CourseAPI from "./course";

export const useCourses = () => {
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await CourseAPI();
        setCourseData(data);
      } catch (error) {
        // console.error("Error fetching course data:", error);
        setErrorMessage(errorMessage || "Failed to fetch course data.");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return { courseData, errorMessage, loading };
};
