"use client";

import { useState, useEffect } from 'react';
import useMyPerformingCourses from "@/features/courses/hooks/useMyPerformingCourses";
import { TeacherRatingBodyType } from "@/features/rating/types/teacher-rating";
import { useTeacherStatistics } from "@/features/users/hooks/useTeacherStatistics";
import { teacherService } from "@/features/users/services/teacher";
import useSWR from "swr";
import { UserBodyType } from '@/features/users/schema/user';
import useEnrollCourses from "@/features/enroll-courses/hooks/useEnrollCourses";

const fetcher = async (
  teacherId: string
): Promise<TeacherRatingBodyType | null> => {
  const { result: data } = await teacherService.getRating(teacherId);
  if (!data?.result) {
    throw new Error("Failed to fetch teacher rating");
  }
  return data.result;
};

export default function useDashboardHome() {
  const [user, setUser] = useState<UserBodyType | null>(null);
  const { statistics, loading: statisticLoading } = useTeacherStatistics();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);
  const userId = user ? user.userId : null;

  const { data: rating, isLoading: ratingLoading } =
    useSWR<TeacherRatingBodyType | null>(
      userId ? `teacher-rating-${userId}` : null,
      () => (userId ? fetcher(userId) : null)
    );
  const teacherRating = rating?.avgteacherRating ?? 0;

  const { topCourses, isLoading: topCoursesLoading } = useMyPerformingCourses();

  const { students, loading: recentEnrollLoading } = useEnrollCourses();

  return {
    statistics,
    userId,
    teacherRating,
    topCourses,
    students,
    statisticLoading,
    ratingLoading,
    topCoursesLoading,
    recentEnrollLoading,
  };
}