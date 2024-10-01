import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "lucide-react";
import dynamic from "next/dynamic";
import { TeacherStatisticsBodyType } from "@/features/users/types/teacher-statistic";
import { TeacherMyCoursesBodyType } from "@/features/courses/types/teacher-my-courses";
import { CoursesBarStackedChart } from "@/features/courses/components/atoms/courses-bar-stacked-chart";
import { CoursesRadialChart } from "@/features/courses/components/atoms/courses-radius-chart";
import Link from "next/link";

const CourseStatusDonutChart = dynamic(
  () =>
    import("@/features/courses/components/atoms/course-status-pie-chart").then(
      (mod) => mod.CourseStatusDonutChart
    ),
  {
    loading: () => (
      <div className="w-full h-[200px] flex items-center justify-center">
        Loading...
      </div>
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

const TeacherCourseTemplate = ({
  teacherStatistic,
  teacherMyCourses,
}: TeacherCourseTemplateProps) => {
  if (!teacherStatistic || !teacherMyCourses) return <div></div>;

  return (
    <div className="w-full flex flex-col gap-4 xl:gap-6">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Course Management</h1>

        <Link href={"/dashboard/courses/add"} passHref>
          <Button className="flex items-center gap-2">
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
              {teacherMyCourses.map((course) => (
                <TableRow key={course.courseId}>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.status}</TableCell>
                  <TableCell>{course.totalEnrollments}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default TeacherCourseTemplate;