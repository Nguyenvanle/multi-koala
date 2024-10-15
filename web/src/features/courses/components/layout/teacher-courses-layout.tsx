import React from "react";
import Link from "next/link";
import { PlusCircle, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/features/courses/components/atoms/breadcrumb";
import { CourseStatusDonutChart } from "@/features/courses/components/atoms/course-status-pie-chart";
import { TeacherCourseTable } from "@/features/courses/components/organisms/teacher-course-table";
import { TeacherOverviewList } from "@/features/courses/components/organisms/teacher-overview-list";
import { TeacherStatisticsBodyType } from "@/features/users/types/teacher-statistic";
import { TeacherMyCoursesBodyType } from "@/features/courses/types/teacher-my-courses";
import { Input } from "@/components/ui/input";

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
  { label: "Course Management" },
];

const TeacherCourseLayout = ({
  teacherStatistic,
  teacherMyCourses,
}: TeacherCourseTemplateProps) => {
  const timestamp = new Date().getTime();

  return (
    <div className="w-full flex flex-col gap-4 xl:gap-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Breadcrumbs items={breadcrumbs} />

        <div className="relative flex-grow w-full md:max-w-96 ">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search for course names..."
            // value={value}
            // onChange={onChange}
            className="pl-8 focus:border-accent"
          />
        </div>
        {/* <Link href="/dashboard/courses/add" passHref>
          <Button className="flex items-center gap-2" size={"sm"}>
            <PlusCircle className="w-5 h-5" />
            Add New Course
          </Button>
        </Link> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
        <TeacherOverviewList teacherStatistic={teacherStatistic} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6">
        <CourseStatusDonutChart teacherCourseStatistic={teacherMyCourses} />
        <Card className="overflow-hidden pr-2">
          <TeacherCourseTable
            teacherMyCourses={teacherMyCourses}
            timestamp={timestamp}
          />
        </Card>
      </div>
    </div>
  );
};

export default TeacherCourseLayout;
