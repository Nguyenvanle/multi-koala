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
import OverviewCard from "@/features/courses/components/molecules/teacher-overview-card";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
// Dynamic import cho CourseStatusDonutChart
const CourseStatusDonutChart = dynamic(
  () =>
    import("@/features/courses/components/atoms/course-status-pie-chart").then(
      (mod) => mod.CourseStatusDonutChart
    ),
  {
    loading: () => (
      <Skeleton className="h-full bg-background animate-pulse rounded-lg" />
    ),
    ssr: false, // Nếu bạn không cần render phía server
  }
);

const courseData = [
  { id: 1, name: "Course 1", status: "Ongoing", students: 25 },
  { id: 2, name: "Course 2", status: "Upcoming", students: 15 },
  { id: 3, name: "Course 3", status: "Completed", students: 30 },
  { id: 4, name: "Course 4", status: "Completed", students: 45 },
  { id: 5, name: "Course 5", status: "Completed", students: 20 },
];

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
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

export const colors = ["#15A89E", "#FFB347", "#FF6B6B", "#4E9AF1"];

const TeacherCourseTemplate = () => {
  return (
    <div className="flex flex-grow">
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Course Management</h1>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8">
          {/* Overview Statistics */}
          <OverviewCard {...overviewData} />

          {/* Revenue Chart */}
          <CourseStatusDonutChart />

          {/* Course List */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Course List</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto pr-4 max-h-[320px]">
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
    </div>
  );
};

export default TeacherCourseTemplate;
