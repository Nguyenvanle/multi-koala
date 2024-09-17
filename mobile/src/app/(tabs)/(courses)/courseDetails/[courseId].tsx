// app/courses/[id].tsx
import React from "react";
import { useLocalSearchParams } from "expo-router";
import CourseDetails from "@/src/components/specific/course/CourseDetail";
import { fetchCourseDetails } from "@/src/feature/api/course-details";
import { Text, View } from "react-native";

export default function CourseDetailsPage() {
  const { id } = useLocalSearchParams();
  const [course, setCourse] = React.useState<CourseData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchCourseDetails(id as string);
        setCourse(data);
      } catch (err) {
        setError("Không thể tải thông tin khóa học. Vui lòng thử lại sau.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCourseDetails();
  }, [id]);

  if (loading) {
    return <Text>Đang tải...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return course ? <CourseDetails course={course} /> : null;
}
