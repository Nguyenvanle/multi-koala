import { teacherService } from "@/features/users/services/teacher";
import { TeacherDetailResult } from "@/features/users/types/teacher-res";
import useSWR from "swr";

export function useTeacherProfile(teacherId: string) {
  const { data, error } = useSWR(`teacher-${teacherId}`, () =>
    teacherService.getById(teacherId)
  );

  return {
    teacher: data?.result?.result as TeacherDetailResult,
    loading: !error && !data,
    error: error?.message,
  };
}