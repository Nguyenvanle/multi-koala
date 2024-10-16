import React from "react";
import { Card } from "@/components/ui/card";
import { CourseStatusDonutChart } from "@/features/courses/components/atoms/course-status-pie-chart";
import { TeacherStatisticsBodyType } from "@/features/users/types/teacher-statistic";
import { TeacherMyCoursesBodyType } from "@/features/courses/types/teacher-my-courses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COURSE_VERIFY } from "@/types/course/verify";
import {
  TeacherCoursesHeader,
  TeacherCoursesTableHeader,
  TeacherCourseTable,
  TeacherOverviewList,
  TeacherTable,
} from "@/features/courses/components/organisms";

interface TeacherCourseTemplateProps {
  teacherStatistic: TeacherStatisticsBodyType;
  teacherMyCourses: TeacherMyCoursesBodyType;
}

const coursesData = [
  {
    id: 1,
    name: "Laser Lemonade Machine",
    status: "Draft",
    price: 499.99,
    totalSales: 25,
    createdAt: "2023-07-12 10:42 AM",
    imageSrc: "/placeholder.svg",
  },
  // ... other courses
];

const TeacherCourseLayout = ({
  teacherStatistic,
  teacherMyCourses,
}: TeacherCourseTemplateProps) => {
  const timestamp = new Date().getTime();

  return (
    <div className="w-full flex flex-col gap-4 xl:gap-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <TeacherCoursesHeader />
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-6">
          <TeacherCoursesTableHeader />
        </div>

        <TabsContent value="all">
          <TeacherTable courses={coursesData} totalCourses={32} />
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
