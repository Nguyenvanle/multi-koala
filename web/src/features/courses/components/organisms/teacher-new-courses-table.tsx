import PageNavigation from "@/features/pagination/components/page-nav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TableBody, Table } from "@/components/ui/table";
import {
  TeacherTableHeader,
  TeacherTableRow,
} from "@/features/courses/components/molecules";
import { SortOption } from "@/features/courses/hooks/useMyTeacherCourses";
import {
  TeacherMyCourseBodyType,
  TeacherMyCoursesBodyType,
} from "@/features/courses/types/teacher-my-courses";
import { Dispatch, SetStateAction } from "react";
import {
  PaginationControlProps,
  PaginationProps,
} from "@/features/pagination/types/pagination";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import {
  EmptyState,
  LoadingState,
} from "@/features/courses/components/atoms/empty-state";
import { DialogCSVCourse } from "@/features/courses/components/molecules/csv-form";

export interface TeacherTableProps {
  courses: TeacherMyCoursesBodyType;
  setSortOption: Dispatch<SetStateAction<SortOption | null>>;
  currentSort: SortOption | null;
  controls: PaginationControlProps;
  pagination: PaginationProps;
  coursesLoading: boolean;
  mutateCourses: () => void;
}

export default function TeacherTable({
  courses,
  setSortOption,
  currentSort,
  controls,
  pagination,
  coursesLoading,
  mutateCourses,
}: TeacherTableProps) {
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader className="flex flex-row justify-between p-4 sm:p-6">
        <div className="flex flex-col">
          <CardTitle>Courses</CardTitle>
          <CardDescription>
            Manage your courses and view their sales performance.
          </CardDescription>
        </div>

        <div className="flex flex-row gap-2">
          <DialogCSVCourse mutateCourses={mutateCourses} />
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
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 min-h-[366px] xl:min-h-[444px]">
        {coursesLoading ? (
          <div className="flex flex-col justify-center min-h-[366px] xl:min-h-[444px]">
            <LoadingState />
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col justify-center min-h-[366px] xl:min-h-[444px]">
            <EmptyState />
          </div>
        ) : (
          <div className="border rounded">
            <Table>
              <TeacherTableHeader
                setSortOption={setSortOption}
                sortOption={currentSort}
              />
              <TableBody>
                {courses.map((course: TeacherMyCourseBodyType, index) => (
                  <TeacherTableRow
                    key={course.courseId}
                    course={course}
                    index={startIndex + index}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4 md:flex-row justify-between items-center px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="text-sm text-muted-foreground">
          Showing
          <span className="font-bold">
            {" "}
            {startIndex + 1}-
            {Math.min(startIndex + courses.length, pagination.totalItems)}
          </span>{" "}
          of <span className="font-bold ">{pagination.totalItems} </span>
          courses
        </div>
        <PageNavigation controls={controls} pagination={pagination} />
      </CardFooter>
    </Card>
  );
}