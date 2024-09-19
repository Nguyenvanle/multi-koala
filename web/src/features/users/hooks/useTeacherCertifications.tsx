import { CertificationsResult } from "@/features/certification/types/certification-res";
import { teacherService } from "@/features/users/services/teacher";
import { useEffect, useState } from "react";

export default function useTeacherCertifications(teacherId: string) {
  const [certifications, setCertifications] =
    useState<CertificationsResult | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTeacherCertifications() {
      try {
        const { result } = await teacherService.getAllCertifications(teacherId);

        setCertifications(result?.result as CertificationsResult);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeacherCertifications();
  }, [teacherId]);

  return { certifications, error, loading };
}
