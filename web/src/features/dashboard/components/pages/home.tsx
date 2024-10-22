"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/features/dashboard/components/molecules/dashboard-header";
import DashboardRecentlySoldCourses from "@/features/dashboard/components/molecules/dashboard-recent";
import DashboardTopPerformingCourses from "@/features/dashboard/components/molecules/dashboard-top";
import useDashboardHome from "@/features/dashboard/hooks/useDashboardHome";

export default function DashboardHomePage() {
  const { statistics, teacherRating, topCourses, statisticLoading } =
    useDashboardHome();

  if (statistics && teacherRating && topCourses) {
    console.log(`Teacher Statistic:`, statistics);
    console.log(`AVG Rating:`, teacherRating);
    console.log(`Top Courses:`, topCourses);
  }

  if (statisticLoading)
    return (
      <div className="flex flex-col flex-1 gap-4 xl:gap-6">
        <Skeleton className="w-80 h-32" />
        <div className="grid gap-4 xl:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <DashboardRecentlySoldCourses />
          <DashboardTopPerformingCourses />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col flex-1 gap-4 xl:gap-6">
      <DashboardHeader statistics={statistics} teacherRating={teacherRating} />
      <div className="grid gap-4 xl:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <DashboardRecentlySoldCourses />
        <DashboardTopPerformingCourses />
      </div>
    </div>
  );
}
