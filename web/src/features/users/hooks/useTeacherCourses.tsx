import { CoursesResultResType } from "@/features/courses/types/course";
import { teacherService } from "@/features/users/services/teacher";
import { TeacherDetailResult } from "@/features/users/types/teacher-res";
import { useEffect, useState } from "react";

export default function useTeacherCourses(teacherId: string) {
  const [courses, setCourses] = useState<CoursesResultResType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const { result } = await teacherService.getAllCourses(teacherId);
        setCourses(result?.result as CoursesResultResType);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeacher();
  }, [teacherId]);

  return { courses, loading, error };
}
