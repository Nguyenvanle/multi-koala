import { teacherService } from "@/features/users/services/teacher";
import { TeacherDetailResult } from "@/features/users/types/teacher-res";
import { useEffect, useState } from "react";

export default function useTeacherProfile(teacherId: string) {
  const [teacher, setTeacher] = useState<TeacherDetailResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const { result } = await teacherService.getById(teacherId);
        setTeacher(result?.result as TeacherDetailResult);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeacher();
  }, [teacherId]);

  return { teacher, loading, error };
}
