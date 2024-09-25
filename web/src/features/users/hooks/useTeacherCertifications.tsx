import { CertificationsResult } from "@/features/certification/types/certification-res";
import { teacherService } from "@/features/users/services/teacher";
import useSWR from "swr";

export function useTeacherCertifications(teacherId: string) {
  const { data, error } = useSWR(`teacher-certifications-${teacherId}`, () =>
    teacherService.getAllCertifications(teacherId)
  );

  return {
    certifications: data?.result?.result as CertificationsResult,
    loading: !error && !data,
    error: error?.message,
  };
}