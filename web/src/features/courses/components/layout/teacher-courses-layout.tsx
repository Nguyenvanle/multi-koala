import React from "react";
import Link from "next/link";
import { PlusCircle, Home, Search, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/features/courses/components/atoms/breadcrumb";
import { CourseStatusDonutChart } from "@/features/courses/components/atoms/course-status-pie-chart";
import { TeacherCourseTable } from "@/features/courses/components/organisms/teacher-course-table";
import { TeacherOverviewList } from "@/features/courses/components/organisms/teacher-overview-list";
import { TeacherStatisticsBodyType } from "@/features/users/types/teacher-statistic";
import { TeacherMyCoursesBodyType } from "@/features/courses/types/teacher-my-courses";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COURSE_VERIFY } from "@/types/course/verify";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TeacherCoursesHeader from "@/features/courses/components/organisms/teacher-courses-header";
import TeacherTable from "@/features/courses/components/organisms/teacher-new-courses-table";

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
      <div className="flex flex-row items-center justify-between gap-4">
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Approved
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Pending Approval
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>In Editing</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Rejected</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-8 gap-1" size="sm">
            <PlusCircle className="w-3.5 h-3.5" />
            <Link
              href="/dashboard/courses/add"
              className="sr-only sm:not-sr-only sm:whitespace-nowrap font-normal"
            >
              Add New Course
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-6">
          <TeacherCoursesHeader />
        </div>

        <TabsContent value="all">
          <TeacherTable />
        </TabsContent>

        <TabsContent value={COURSE_VERIFY.Values.APPROVED}>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherCourseLayout;
