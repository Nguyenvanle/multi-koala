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

export default function TeacherTable({
  courses,
  setSortOption,
  currentSort,
}: {
  courses: TeacherMyCoursesBodyType;
  setSortOption: Dispatch<SetStateAction<SortOption | null>>;
  currentSort: SortOption | null;
}) {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Courses</CardTitle>
        <CardDescription>
          Manage your courses and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TeacherTableHeader setSortOption={setSortOption} sortOption={currentSort} />
          <TableBody>
            {courses.map((course: TeacherMyCourseBodyType, index) => (
              <TeacherTableRow
                key={course.courseId}
                course={course}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{courses.length}</strong> of{" "}
          <strong>{courses.length}</strong> courses
        </div>
      </CardFooter>
    </Card>
  );
}