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
} from "lucide-react";
import dynamic from "next/dynamic";
import { TeacherStatisticsBodyType } from "@/features/users/types/teacher-statistic";
import { CoursesResultResType } from "@/features/courses/types/course";

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

const courseData = [
  { id: 1, name: "Course 1", status: "Ongoing", students: 25 },
  { id: 2, name: "Course 2", status: "Upcoming", students: 15 },
  { id: 3, name: "Course 3", status: "Completed", students: 30 },
  { id: 4, name: "Course 4", status: "Completed", students: 45 },
  { id: 5, name: "Course 5", status: "Completed", students: 20 },
];

const overviewData = {
  totalCourses: 10,
  totalApprovedCourses: 8,
  totalEnrollments: 150,
  totalStudents: 120,
  totalCompletedCourses: 5,
  totalPrices: 28000.0,
  passRatingPerTest: 0.0,
  correctRatingPerQuestion: 0.0,
};

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
  teacherMyCourses: CoursesResultResType;
}

const TeacherCourseTemplate = ({
  teacherStatistic,
  teacherMyCourses,
}: TeacherCourseTemplateProps) => {
  return (
    <div className=" w-full flex flex-col gap-4 xl:gap-6">
      <h1 className="text-3xl font-bold">Course Management</h1>
      <p>{JSON.stringify(teacherStatistic)}</p>
      <p>{JSON.stringify(teacherMyCourses)}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
        <OverviewCard
          icon={Book}
          title="Total Courses"
          value={overviewData.totalCourses}
          color="bg-emerald-500"
        />
        <OverviewCard
          icon={CheckCircle}
          title="Approved Courses"
          value={overviewData.totalApprovedCourses}
          color="bg-emerald-500"
        />
        <OverviewCard
          icon={Users}
          title="Total Enrollments"
          value={overviewData.totalEnrollments}
          color="bg-orange-400"
        />
        <OverviewCard
          icon={Users}
          title="Total Students"
          value={overviewData.totalStudents}
          color="bg-orange-400"
        />
        <OverviewCard
          icon={CheckCircle}
          title="Completed Courses"
          value={overviewData.totalCompletedCourses}
          color="bg-red-400"
        />
        <OverviewCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${overviewData.totalPrices.toLocaleString()}`}
          color="bg-red-400"
        />
        <OverviewCard
          icon={BarChart2}
          title="Pass Rate per Test"
          value={`${overviewData.passRatingPerTest}%`}
          color="bg-blue-400"
        />
        <OverviewCard
          icon={Clock}
          title="Correct Rate per Question"
          value={`${overviewData.correctRatingPerQuestion}%`}
          color="bg-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6">
        <CourseStatusDonutChart />

        <Card>
          <CardHeader>
            <CardTitle>Course List</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto pr-4 xl:pr-8 max-h-[320px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseData.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.status}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherCourseTemplate;