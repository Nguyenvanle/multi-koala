"use client";
import { TeacherCourseSkeletonTemplate } from "@/features/courses/components/atoms/teacher-course-skeleton";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    redirect("/dashboard/courses");
  }, []);

  return (
    <div className="min-h-[100vh] w-full">
      <TeacherCourseSkeletonTemplate />
    </div>
  );
}
