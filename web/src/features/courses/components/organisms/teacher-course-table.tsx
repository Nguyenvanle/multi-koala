import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TeacherMyCoursesBodyType } from "@/features/courses/types/teacher-my-courses";

const statusColors = {
  APPROVED: "hsl(152, 57%, 58%)",
  PENDING_APPROVAL: "hsl(35, 100%, 50%)",
  REJECTED: "hsl(0, 84%, 60%)",
  IN_EDITING: "hsl(201, 96%, 32%)",
};

const statusLabels = {
  APPROVED: "Approved",
  PENDING_APPROVAL: "Pending Approval",
  REJECTED: "Rejected",
  IN_EDITING: "In Editing",
};

const TeacherCourseTable = ({
  teacherMyCourses,
  timestamp,
}: {
  teacherMyCourses: TeacherMyCoursesBodyType;
  timestamp: number;
}) => (
  <Table
    className="rounded-md w-full h-10 overflow-clip relative"
    divClassname="max-h-[400px] h-full overflow-y-scroll pr-2"
  >
    <TableHeader className="sticky w-full top-0 h-10 rounded-t-md bg-background">
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
              You haven&#39;t created any courses yet.
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
                href={`/courses/${course.courseId}?refresh=${timestamp}`}
                className="hover:text-emerald-500 font-semibold"
                title="View course details"
              >
                {course.courseName}
              </Link>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: statusColors[course.status] }}
                />
                <span>{statusLabels[course.status]}</span>
              </div>
            </TableCell>
            <TableCell>{course.totalEnrollments}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                <Link
                  href={`/dashboard/courses/${course.courseId}?refresh=${timestamp}`}
                >
                  Edit
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
);

export default TeacherCourseTable;
