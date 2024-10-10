"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Book,
  CheckCircle,
  Users,
  DollarSign,
  BarChart2,
  Clock,
  PlusCircle,
  ChevronRight,
  Home,
} from "lucide-react";
import dynamic from "next/dynamic";
import { TeacherStatisticsBodyType } from "@/features/users/types/teacher-statistic";
import { TeacherMyCoursesBodyType } from "@/features/courses/types/teacher-my-courses";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/features/courses/components/atoms/breadcrumb";

const CourseStatusDonutChart = dynamic(
  () =>
    import("@/features/courses/components/atoms/course-status-pie-chart").then(
      (mod) => mod.CourseStatusDonutChart
    ),
  {
    loading: () => (
      <Skeleton className="w-full h-full flex items-center justify-center bg-background"></Skeleton>
    ),
    ssr: false,
  }
);

const OverviewCard = ({ icon: Icon, title, value, color }: any) => (
  <Card className="flex-1 ">
    <CardContent className="flex items-start p-4">
      <div className={`p-4 rounded-lg mr-4 ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex flex-col self-stretch justify-between ">
        <p className="text-sm text-gray-500 line-clamp-1" title={title}>
          {title}
        </p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

interface TeacherCourseTemplateProps {
  teacherStatistic: TeacherStatisticsBodyType;
  teacherMyCourses: TeacherMyCoursesBodyType;
}

const breadcrumbs = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-4 h-4" />,
  },
  { label: "Course Management" }, // Không có href, hiển thị như text tĩnh
];

const TeacherCourseTemplate = ({
  teacherStatistic,
  teacherMyCourses,
}: TeacherCourseTemplateProps) => {
  return (
    <div className="w-full flex flex-col gap-4 xl:gap-6">
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <Breadcrumbs items={breadcrumbs} />
        <Link href="/dashboard/courses/add" passHref>
          <Button className="flex items-center gap-2" size={"sm"}>
            <PlusCircle className="w-5 h-5" />
            Add New Course
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
        <OverviewCard
          icon={Book}
          title="Total Courses"
          value={teacherStatistic.totalCourses}
          color="bg-emerald-500"
        />
        <OverviewCard
          icon={CheckCircle}
          title="Approved Courses"
          value={teacherStatistic.totalApprovedCourses}
          color="bg-emerald-500"
        />
        <OverviewCard
          icon={Users}
          title="Total Enrollments"
          value={teacherStatistic.totalEnrollments}
          color="bg-orange-400"
        />
        <OverviewCard
          icon={Users}
          title="Total Students"
          value={teacherStatistic.totalStudents}
          color="bg-orange-400"
        />
        <OverviewCard
          icon={CheckCircle}
          title="Completed Courses"
          value={teacherStatistic.totalCompletedCourses}
          color="bg-red-400"
        />
        <OverviewCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${teacherStatistic.totalPrices.toLocaleString()}`}
          color="bg-red-400"
        />
        <OverviewCard
          icon={BarChart2}
          title="Pass Rate per Test"
          value={`${teacherStatistic.passRatingPerTest * 100}%`}
          color="bg-blue-400"
        />
        <OverviewCard
          icon={Clock}
          title="Correct Rate per Question"
          value={`${(teacherStatistic.correctRatingPerQuestion * 100).toFixed(
            1
          )}%`}
          color="bg-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6">
        <CourseStatusDonutChart teacherCourseStatistic={teacherMyCourses} />

        <Card className="overflow-hidden pr-2">
          <Table
            className="rounded-md w-full h-10 overflow-clip relative"
            divClassname="max-h-[400px] h-full overflow-y-scroll pr-2"
          >
            <TableHeader className="sticky w-full top-0 h-10 rounded-t-md bg-background ">
              <TableRow>
                <TableHead className="text-primary font-semibold text-base">
                  Name
                </TableHead>
                <TableHead className="text-primary font-semibold text-base">
                  Status
                </TableHead>
                <TableHead className="text-primary font-semibold text-base">
                  Students
                </TableHead>
                <TableHead className="text-primary font-semibold text-base">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherMyCourses.length === 0 ? (
                <TableRow className="h-[400px]">
                  <TableCell colSpan={4} className="text-center py-4">
                    <p className="text-gray-500">
                      You haven&apos;t created any courses yet.
                    </p>
                    <Link href="/dashboard/courses/add" passHref>
                      <Button className="mt-2" variant="outline" size="sm">
                        Create Your First Course
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ) : (
                teacherMyCourses.map((course) => (
                  <TableRow
                    key={course.courseId}
                    className="hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    <TableCell>
                      <Link
                        href={`/courses/${course.courseId}`}
                        className="hover:text-emerald-500 font-semibold"
                        title="View course details"
                      >
                        {course.courseName}
                      </Link>
                    </TableCell>
                    <TableCell>{course.status}</TableCell>
                    <TableCell>{course.totalEnrollments}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Link href={`/dashboard/courses/${course.courseId}`}>
                          Edit
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default TeacherCourseTemplate;
