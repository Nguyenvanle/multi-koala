"use client";

import { DashboardHeader } from "@/features/dashboard/components/molecules/dashboard-header";
import DashboardRecentCourseSales from "@/features/dashboard/components/molecules/dashboard-recent";
import DashboardTopPerformingCourses from "@/features/dashboard/components/molecules/dashboard-top";
import useDashboardHome from "@/features/dashboard/hooks/useDashboardHome";

export default function DashboardHomePage() {
  const { statistics, teacherRating } = useDashboardHome();

  return (
    <div className="flex flex-col flex-1 gap-4 xl:gap-6">
      <div className="flex flex-row">
        <pre>Teacher Statistic: {JSON.stringify(statistics, null, 2)}</pre>
        <pre>AVG Rating: {teacherRating}</pre>
      </div>
      <DashboardHeader />
      <div className="grid gap-4 xl:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <DashboardRecentCourseSales />
        <DashboardTopPerformingCourses />
      </div>
    </div>
  );
}
