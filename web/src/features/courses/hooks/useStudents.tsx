import { Student } from "@/features/courses/components/molecules/students-card";
import { courseService } from "@/features/courses/services/courses";
import { useEffect, useState } from "react";

export default function useStudent({ courseId }: { courseId: string }) {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const { result } = await courseService.getAllStudent(courseId);
        setStudents(result?.result as any);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

  return { students, loading, error };
}
