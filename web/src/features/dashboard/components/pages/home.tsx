"use client";

import { DashboardHeader } from "@/features/dashboard/components/molecules/dashboard-header";
import DashboardTopPerformingCourses from "@/features/dashboard/components/molecules/dashboard-top";
import DashboardRecentlySoldCourses from "@/features/dashboard/components/organisms/dashboard-recent-sold";
import useDashboardHome from "@/features/dashboard/hooks/useDashboardHome";
import { StudentChartBodyType } from "@/features/enroll-courses/types/my-student-chart";

export default function DashboardHomePage({
  studentChartData,
}: {
  studentChartData: StudentChartBodyType;
}) {
  const {
    statistics,
    teacherRating,
    topCourses,
    students,
    search,
    pagination,
    paginationControls,
    topPagination,
    topPaginationControls,

    months,
    setMonths,
  } = useDashboardHome();

  return (
    <div className="flex flex-col flex-1 gap-4 xl:gap-6">
      <DashboardHeader
        statistics={statistics}
        teacherRating={teacherRating}
        studentChartData={studentChartData}
      />
      <div className="grid gap-4 xl:gap-6 grid-cols-1 xl:grid-cols-3">
        <DashboardRecentlySoldCourses
          courseSales={students}
          search={search}
          controls={paginationControls}
          pagination={pagination}
        />
        <DashboardTopPerformingCourses
          topCourses={topCourses}
          controls={topPaginationControls}
          pagination={topPagination}
          months={months}
          setMonths={setMonths}
        />
      </div>
    </div>
  );
}
