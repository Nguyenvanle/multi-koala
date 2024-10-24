"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/features/dashboard/components/molecules/dashboard-header";
import DashboardTopPerformingCourses from "@/features/dashboard/components/molecules/dashboard-top";
import DashboardRecentlySoldCourses from "@/features/dashboard/components/organisms/dashboard-recent-sold";
import useDashboardHome from "@/features/dashboard/hooks/useDashboardHome";

export default function DashboardHomePage() {
  const {
    statistics,
    teacherRating,
    topCourses,
    students,

    statisticLoading,
    ratingLoading,
    topCoursesLoading,
    recentEnrollLoading,

    search,
    pagination,
    paginationControls,
  } = useDashboardHome();

  if (
    statisticLoading ||
    topCoursesLoading ||
    ratingLoading ||
    recentEnrollLoading
  )
    return (
      <div className="flex flex-col flex-1 gap-4 xl:gap-6">
        <Skeleton className="h-24" />
        <div className="grid gap-4 xl:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col flex-1 gap-4 xl:gap-6">
      <DashboardHeader statistics={statistics} teacherRating={teacherRating} />
      <div className="grid gap-4 xl:gap-6 grid-cols-1 xl:grid-cols-3">
        <DashboardRecentlySoldCourses
          courseSales={students}
          search={search}
          controls={paginationControls}
          pagination={pagination}
        />
        <DashboardTopPerformingCourses topCourses={topCourses} />
      </div>
    </div>
  );
}
