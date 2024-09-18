import { CoursesResultResType } from "@/features/courses/types/course";
import { teacherService } from "@/features/users/services/teacher";
import { COURSE_VERIFY } from "@/types/course/verify";
import { useEffect, useState } from "react";

export default function useTeacherCourses(teacherId: string) {
    const [courses, setCourses] = useState<CoursesResultResType | null>(null);
    const [approvedCourses, setApprovedCourses] = useState<CoursesResultResType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchTeacher() {
        try {
          const { result } = await teacherService.getAllCourses(teacherId);
          
          // Lưu tất cả khóa học
          setCourses(result?.result as CoursesResultResType);
  
          // Lọc ra các khóa học đã được APPROVED
          const approvedCourses = result?.result?.filter(course => 
            COURSE_VERIFY.safeParse(course.status).success && course.status === "APPROVED"
          ) as CoursesResultResType;
  
          // Lưu các khóa học đã được APPROVED
          setApprovedCourses(approvedCourses);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
  
      fetchTeacher();
    }, [teacherId]);
  
    return { courses, approvedCourses, loading, error };
  }